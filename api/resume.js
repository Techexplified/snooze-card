import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { cardId, token } = req.body;

  try {
    // Unarchive the card via Trello API
    const unarchiveRes = await fetch(
      `https://api.trello.com/1/cards/${cardId}?closed=false&key=${process.env.TRELLO_API_KEY}&token=${token}`,
      { method: "PUT" },
    );

    if (!unarchiveRes.ok) {
      const err = await unarchiveRes.text();
      return res
        .status(500)
        .json({ error: "Failed to unarchive card", details: err });
    }

    // Remove from Redis
    if (!client.isOpen) await client.connect();
    await client.del(`pause:${cardId}`);
    await client.zRem("pausedCards", cardId);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
