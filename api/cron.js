import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

export default async function handler(req, res) {
  try {
    if (!client.isOpen) await client.connect();

    const now = Date.now();

    // Get all cards whose pause time has passed
    const expiredCardIds = await client.zRangeByScore("pausedCards", 0, now);

    console.log(`Cron: found ${expiredCardIds.length} expired cards`);

    for (const cardId of expiredCardIds) {
      const data = await client.get(`pause:${cardId}`);
      if (!data) continue;

      const { token } = JSON.parse(data);

      // Unarchive the card
      const res2 = await fetch(
        `https://api.trello.com/1/cards/${cardId}?closed=false&key=${process.env.TRELLO_API_KEY}&token=${token}`,
        { method: "PUT" },
      );

      if (res2.ok) {
        await client.del(`pause:${cardId}`);
        await client.zRem("pausedCards", cardId);
        console.log(`Cron: unarchived card ${cardId}`);
      } else {
        console.error(`Cron: failed to unarchive card ${cardId}`);
      }
    }

    return res
      .status(200)
      .json({ success: true, processed: expiredCardIds.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
