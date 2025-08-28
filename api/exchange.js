export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Authorization code manquant" });
    }

    const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_key: process.env.sbawyevz981byo72o7,
        client_secret: process.env.CDub1xDKsDQC1qitvJSGBq7wSX4mSVqL,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.https://raphaelpro022.github.io/tiktok-site/callback.html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erreur API Exchange:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
