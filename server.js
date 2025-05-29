const express = require("express");
const whois = require("whois-json");
const util = require("minecraft-server-util");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/check", async (req, res) => {
  const { ip } = req.query;
  if (!ip) return res.status(400).json({ error: "Missing IP or domain." });

  try {
    // WHOIS Lookup
    const whoisData = await whois(ip);

    // Minecraft Server Status
    let mcData = { online: false };
    try {
      const result = await util.status(ip, { port: 25565, timeout: 3000 });
      mcData = { ...result, online: true };
    } catch (err) {
      mcData = { online: false, error: "Not a Minecraft server or offline" };
    }

    res.json({ whois: whoisData, minecraft: mcData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
