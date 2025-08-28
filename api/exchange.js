// api/exchange.js

export default async function handler(req, res) {
  // ✅ Autoriser CORS (pour éviter Failed to fetch)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Réponse immédiate pour les requêtes OPTIONS (pré-flight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ N'accepte que POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    // 🔑 Envoi du code à TikTok pour échanger contre un access_token
    const response = await fetch("https://open-api.tiktokglobalshop.com/oauth/access_token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_key: process.env.sbawyevz981byo72o7,
        client_secret: process.env.CDub1xDKsDQC1qitvJSGBq7wSX4mSVqL,
        code,
        grant_type: "authorization_code",
        redirect_uri: "https://raphaelpro022.github.io/tiktok-site/callback.html"
      })
    });

    const data = await response.json();

    // ✅ Renvoie la réponse TikTok au navigateur
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
