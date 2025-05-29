const express = require('express');
const whois = require('whois-json');
const util = require('minecraft-server-util');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/api/check', async (req, res) => {
    const { ip } = req.query;

    if (!ip) return res.status(400).json({ error: 'IP is required' });

    try {
        let whoisData = await whois(ip);

        let mcData = null;
        try {
            mcData = await util.status(ip);
        } catch (err) {
            mcData = { online: false, error: err.message };
        }

        res.json({
            whois: whoisData,
            minecraft: mcData
        });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving info', details: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
