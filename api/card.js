export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { cardId, closed } = req.body;

  const API_KEY = process.env.TRELLO_API_KEY;
  const TOKEN = process.env.TRELLO_TOKEN;

  console.log("API_KEY", API_KEY);
  console.log("TOKEN", TOKEN);

  if (!API_KEY || !TOKEN) {
    return res.status(500).json({ error: "Missing credentials" });
  }

  const trelloRes = await fetch(
    `https://api.trello.com/1/cards/${cardId}?closed=${closed}&key=${API_KEY}&token=${TOKEN}`,
    { method: "PUT" },
  );

  const data = await trelloRes.json();
  return res.status(trelloRes.status).json(data);
}
