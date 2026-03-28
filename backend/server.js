const express = require('express');
const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());

// Basic CORS support for local development
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// ── Routes ──────────────────────────────────────────────────────────────────
const foodshareRouter = require('./routes/foodshare');
app.use('/api/foodshare', foodshareRouter);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 fallback
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`FoodShare Pakistan API running on http://localhost:${PORT}`);
});

module.exports = app;
