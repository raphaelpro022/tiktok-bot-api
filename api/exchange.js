export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    // ✅ Appel correct à l’API TikTok OAuth v2
    const params = new URLSearchParams();
    params.append("client_key", process.env.sbawyevz981byo72o7);
    params.append("client_secret", process.env.CDub1xDKsDQC1qitvJSGBq7wSX4mSVqL);
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", "https://raphaelpro022.github.io/tiktok-site/callback.html");

    const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
