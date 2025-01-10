const express = require('express');
const { fetchMarketData } = require('../controllers/marketdata');

const router = express.Router();

// Route to fetch crypto data manually
router.get('/fetch', fetchMarketData);

module.exports = router;