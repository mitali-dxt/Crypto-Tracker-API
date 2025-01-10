const express = require('express');
const { fetchMarketData} = require('../controllers/marketdata');

const router = express.Router();

// Route to fetch crypto coin data manually
router.get('/fetch', fetchMarketData);

module.exports = router;