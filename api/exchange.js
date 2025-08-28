import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    const response = await axios.post(
      "https://open.tiktokapis.com/v2/oauth/token/",
      new URLSearchParams({
        client_key: process.env.sbawyevz981byo72o7,
        client_secret: process.env.CDub1xDKsDQC1qitvJSGBq7wSX4mSVqL,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: process.env.https://raphaelpro022.github.io/tiktok-site/callback.html,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to exchange token" });
  }
}
