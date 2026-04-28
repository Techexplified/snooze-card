export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { cardId, closed, token } = req.body;

  const API_KEY = process.env.TRELLO_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing API key" });
  }

  // Use the user's own token passed from the frontend.
  // Fall back to the server token only if none was provided.
  const TOKEN = token || process.env.TRELLO_TOKEN;

  if (!TOKEN) {
    return res.status(500).json({ error: "Missing Trello token" });
  }

  const trelloRes = await fetch(
    `https://api.trello.com/1/cards/${cardId}?closed=${closed}&key=${API_KEY}&token=${TOKEN}`,
    { method: "PUT" },
  );

  const data = await trelloRes.json();
  return res.status(trelloRes.status).json(data);
}
