const MarketData = require('../models/marketdata');
const gecko_api = 'https://api.coingecko.com/api/v3/coins/markets';

const getStats = async (req, res) => {
    const {coin} = req.query;
    const validCoins = ['bitcoin', 'matic-network', 'ethereum',];
    if (!coin || !validCoins.includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin' });
     }

    try {
        //check if data exists in MongoDB
        const coinData = await MarketData.findOne().sort({ createdAt: -1 });
        if (coinData) {
            const { current_price, market_cap, price_change_24h } = coinData[coin];
            return res.status(200).json({
                price: current_price,
                marketCap: market_cap,
                "24hChange": price_change_24h,
            });
        }
        //if no data in database, fetch from API
        const fetchData = await fetch(`${gecko_api}?vs_currency=usd&ids=${coin}`);
        if (!fetchData.ok) {
            throw new Error(`Failed to fetch data: ${fetchData.statusText}`);
        }
        coinData = fetchData[0];
        return res.status(200).json({
            price: coinData.current_price,
            marketCap: coinData.market_cap,
            "24hChange": coinData.price_change_24h,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json(
            { error: 'Failed to fetch stats.' }
        );
    }
};

module.exports = { getStats };
