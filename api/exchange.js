// api/exchange.js
export default async function handler(req, res) {
  // CORS pour autoriser GitHub Pages
  res.setHeader("Access-Control-Allow-Origin", "https://raphaelpro022.github.io");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Méthode non autorisée" });

  const { code } = req.body || {};
  if (!code) return res.status(400).json({ error: "Authorization code manquant" });

  const CLIENT_KEY = process.env.sbawyevz981byo72o7;
  const CLIENT_SECRET = process.env.CDub1xDKsDQC1qitvJSGBq7wSX4mSVqL;
  // ⚠️ Doit être IDENTIQUE à celui dans TikTok Developer + celui de ton front
  const REDIRECT_URI = process.env.https://raphaelpro022.github.io/tiktok-site/callback.html || ;

  if (!CLIENT_KEY || !CLIENT_SECRET || !REDIRECT_URI) {
    return res.status(500).json({
      error: "Variables d'environnement manquantes",
      missing: {
        TIKTOK_CLIENT_KEY: !!CLIENT_KEY,
        TIKTOK_CLIENT_SECRET: !!CLIENT_SECRET,
        REDIRECT_URI: !!REDIRECT_URI
      }
    });
  }

  const form = new URLSearchParams({
    client_key: CLIENT_KEY,
    client_secret: CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI
  });

  try {
    // ✅ Endpoint OAuth correct (remplace ta ligne 29 par celle-ci)
    const tiktokRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString()
    });

    const text = await tiktokRes.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!tiktokRes.ok) {
      return res.status(tiktokRes.status).json(data);
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to exchange token", details: err.message });
  }
}
