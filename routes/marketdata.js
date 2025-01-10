const express = require('express');
const { fetchMarketData, getStats } = require('../controllers/marketdata');

const router = express.Router();

// Route to fetch crypto data manually
router.get('/fetch', fetchMarketData);

router.get('/stats', getStats);

module.exports = router;