export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { boardId, token } = req.query;

  const API_KEY = process.env.TRELLO_API_KEY;
  const TOKEN = token || process.env.TRELLO_TOKEN;

  if (!API_KEY || !TOKEN) {
    return res.status(500).json({ error: "Missing credentials" });
  }
  if (!boardId) {
    return res.status(400).json({ error: "Missing boardId" });
  }

  try {
    // 1. Get every closed (archived) card on the board.
    const closedRes = await fetch(
      `https://api.trello.com/1/boards/${boardId}/cards/closed` +
        `?key=${API_KEY}&token=${TOKEN}&fields=name`,
    );
    const closedRaw = await closedRes.text();
    let closedCards;
    try {
      closedCards = JSON.parse(closedRaw);
    } catch {
      return res.status(closedRes.status).json({ error: closedRaw });
    }
    if (!closedRes.ok) {
      return res.status(closedRes.status).json({ error: closedCards });
    }

    // 2. For each closed card, check whether *this* Power-Up paused it,
    //    by reading its shared plugin data.
    const results = await Promise.all(
      closedCards.map(async (card) => {
        try {
          const pdRes = await fetch(
            `https://api.trello.com/1/cards/${card.id}/pluginData` +
              `?key=${API_KEY}&token=${TOKEN}`,
          );
          if (!pdRes.ok) return null;
          const pluginData = await pdRes.json();

          for (const entry of pluginData) {
            if (entry.access !== "shared") continue;
            let value;
            try {
              value = JSON.parse(entry.value);
            } catch {
              continue;
            }
            if (value && value.paused === true) {
              return {
                id: card.id,
                name: card.name,
                pauseUntil: value.pauseUntil || null,
                pausedAt: value.pausedAt || null,
              };
            }
          }
          return null;
        } catch {
          return null;
        }
      }),
    );

    const pausedCards = results.filter(Boolean);

    return res.status(200).json({ cards: pausedCards });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
