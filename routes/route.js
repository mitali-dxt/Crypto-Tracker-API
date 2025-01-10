const express = require('express');
const { getStats } = require('../controllers/stats');
const { getDeviation } = require('../controllers/deviation');

const router = express.Router();

//Route to get stats for a coin
router.get('/stats', getStats);

//Route to get standard deviation of a coin market price
router.get('/deviation', getDeviation);

module.exports = router;
