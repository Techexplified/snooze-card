export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { cardId, closed, token } = req.body;

  const API_KEY = process.env.TRELLO_API_KEY;
  const TOKEN = token || process.env.TRELLO_TOKEN;

  console.log("cardId:", cardId);
  console.log("closed:", closed);
  console.log("token from client:", token); // 👈 Is this arriving?
  console.log("env TOKEN:", process.env.TRELLO_TOKEN); // 👈 Is env set?
  console.log("env KEY:", process.env.TRELLO_API_KEY);

  if (!API_KEY || !TOKEN) {
    return res.status(500).json({ error: "Missing credentials" });
  }

  const trelloRes = await fetch(
    `https://api.trello.com/1/cards/${cardId}?closed=${closed}&key=${API_KEY}&token=${TOKEN}`,
    { method: "PUT" },
  );

  // Trello sometimes returns plain text errors (e.g. "unauthorized", "invalid token")
  // so we must read as text first, then attempt JSON parse
  const raw = await trelloRes.text();

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    // Plain text response from Trello — return it as a structured error
    return res.status(trelloRes.status).json({ error: raw });
  }

  return res.status(trelloRes.status).json(data);
}
