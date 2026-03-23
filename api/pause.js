import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { cardId, pauseUntil, token } = req.body;

  try {
    // Archive the card via Trello API
    const archiveRes = await fetch(
      `https://api.trello.com/1/cards/${cardId}?closed=true&key=${process.env.TRELLO_API_KEY}&token=${token}`,
      { method: "PUT" },
    );

    if (!archiveRes.ok) {
      const err = await archiveRes.text();
      return res
        .status(500)
        .json({ error: "Failed to archive card", details: err });
    }

    // Save to Redis
    if (!client.isOpen) await client.connect();

    await client.set(
      `pause:${cardId}`,
      JSON.stringify({
        cardId,
        pauseUntil,
        token,
      }),
    );

    // Add to sorted set with score = resume timestamp
    await client.zAdd("pausedCards", {
      score: new Date(pauseUntil).getTime(),
      value: cardId,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
