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
        console.error('Error fetching crypto stats:', error);
        res.status(500).json(
            { error: 'Failed to fetch cryptocurrency stats.' }
        );
    }
};


const fetchMarketData = async (req, res) => {
    try {
        const params = new URLSearchParams({
            vs_currency: 'usd',
            ids: 'bitcoin,matic-network,ethereum',
        });
  
        const response = await fetch(`${gecko_api}?${params}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
    
        const data = await response.json();

        // Mapping the data
        const mappedData = data.reduce((result, coin) => {
            result[coin.id] = {
            current_price: coin.current_price,
            market_cap: coin.market_cap,
            price_change_24h: coin.price_change_percentage_24h,
            };
            return result;
        }, {});

        // Save to MongoDB
        const Data = new MarketData(mappedData);
        await Data.save();
        console.log('Market Data saved', mappedData);
        if (res) {
            res.status(200).json(
                {message: 'Market data fetched and saved successfully', 
                  data: mappedData 
            });
        }
    } catch (error) {
      console.error('Error fetching or saving data:', error.message);
    }
  };
  
  module.exports = { fetchMarketData , getStats};