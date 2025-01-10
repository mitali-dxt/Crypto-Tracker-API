const MarketData = require('../models/marketdata');  
const {findStandardDeviation} = require('../utils/math');

const getDeviation = async (req, res) => {
    const { coin } = req.query;
    const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
    if (!coin || !validCoins.includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin' });
    }
    try {
        const history = await MarketData.find({}).sort({ timestamp: -1 }).limit(100); 
        if (history.length === 0) {
            return res.status(404).json({ error: 'No records found'});
        }
        //Extract the price values 
        const prices = history.map(history=> history[coin].current_price);
        const deviation = findStandardDeviation(prices);
        return res.status(200).json({ deviation });
    } catch (error) {
        console.error('Error calculating standard deviation:', error);
        res.status(500).json({ error: 'Failed to calculate standard deviation.' });
    }
};

module.exports = { getDeviation };
