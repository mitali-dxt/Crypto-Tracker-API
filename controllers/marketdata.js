require('dotenv').config();
const MarketData = require('../models/marketdata');

const fetchMarketData = async (req, res) => {
    try {
        const params = new URLSearchParams({
            vs_currency: 'usd',
            ids: 'bitcoin,matic-network,ethereum',
        });
  
        const response = await fetch(`${process.env.gecko_api}?${params}`);
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
  
  module.exports = { fetchMarketData};