export default async function handler(req, res) {
  // 🔹 Activer CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 🔹 Réponse immédiate pour le préflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Vérification de la méthode
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code manquant" });
  }

  try {
    // Échange du code contre access_token TikTok
    const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_key: process.env.sbawyevz981byo72o7,
        client_secret: process.env.CDub1xDKsDQC1qitvJSGBq7wSX4mSVqL,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.https://raphaelpro022.github.io/tiktok-site/callback.html,
      }),
    });

    const data = await response.json();
    return res.status(response.ok ? 200 : 400).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
}
