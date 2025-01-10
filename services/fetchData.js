const { fetchMarketData } = require('../controllers/marketdata');

fetchMarketData().then(() => {
    console.log("Initial data fetched and saved.");
}).catch(error => {
    console.error("Error fetching data", error);
});

setInterval(async () => {
    try {
        await fetchMarketData();
        console.log("Data fetched and saved.");
    } catch (error) {
        console.error("Error fetching data", error);
    }
}, 2 * 60 * 1000); //calls the fetchMarketData function every 2 minutes