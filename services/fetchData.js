const { fetchMarketData } = require('../controllers/marketdata');

fetchMarketData().then(() => {
    console.log("Initial market data fetched and saved.");
}).catch(error => {
    console.error("Error fetching data on startup:", error);
});

setInterval(async () => {
    try {
        await fetchMarketData();
        console.log("Market data fetched and saved.");
    } catch (error) {
        console.error("Error fetching data in background job:", error);
    }
}, 2 * 60 * 1000); //calls the fetchMarketData function every 2 minutes