export default async function handler(req, res) {
  const { ip } = req.query;

  // 🔴 check input
  if (!ip) {
    return res.status(400).json({ error: "IP is required" });
  }

  try {
    const response = await fetch(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`,
      {
        headers: {
          Key: process.env.ABUSE_API_KEY,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}