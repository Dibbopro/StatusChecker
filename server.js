const express = require('express');
const cors = require('cors');
const whois = require('whois-json');
const { status } = require('minecraft-server-util');

const app = express();
app.use(cors());

app.get('/api/lookup', async (req, res) => {
  const ip = req.query.ip;
  if (!ip) return res.status(400).json({ error: 'Missing IP' });

  try {
    const whoisData = await whois(ip);
    const mcData = await status(ip, 25565, { timeout: 5000 });

    res.json({ whois: whoisData, minecraft: mcData });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));
