// api/exchange.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ... ton code d’échange TikTok ...
  }

  // Accepte uniquement POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Authorization code manquant" });
    }

    // 🔑 Infos sensibles via variables d’environnement Vercel
    const CLIENT_KEY = process.env.sbawyevz981byo72o7;
    const CLIENT_SECRET = process.env.CDub1xDKsDQC1qitvJSGBq7wSX4mSVqL;
    const REDIRECT_URI = process.env.https://raphaelpro022.github.io/tiktok-site/callback.html;

    if (!CLIENT_KEY || !CLIENT_SECRET || !REDIRECT_URI) {
      return res.status(500).json({ error: "Variables d'environnement manquantes" });
    }

    // 🔄 Appel TikTok API pour échanger le code
    const response = await fetch("https://open-api.tiktokglobalshop.com/api/v2/token/get/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_key: CLIENT_KEY,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: "Échec de l'échange TikTok", details: data });
    }

    // ✅ Retourne le token au front
    return res.status(200).json(data);

  } catch (error) {
    console.error("Erreur API exchange:", error);
    return res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
