const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const gecko_api = 'https://api.coingecko.com/api/v3/coins/markets';

app.get('/market-data', async (req, res) => {
    try {
        const params = new URLSearchParams({
          vs_currency: 'usd',
          ids: 'bitcoin,matic-network,ethereum',
        });
        const response = await fetch(`${gecko_api}?${params}`);
        if(!response) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        //console.log(data);
        const formattedData = data.map(coin => ({
          id: coin.id,
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          price_change_24h: coin.price_change_percentage_24h,
        }));
    
        res.json(formattedData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});