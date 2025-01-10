const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./connect');
const app = express();
const port = 3000;

const marketdataRoute = require('./routes/marketdata');
const { fetchMarketData } = require('./controllers/marketdata');

//connect to MongoDB using Mongoose
connectToMongoDB('mongodb://127.0.0.1:27017/Market-Data').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/market-data', marketdataRoute);

//makes request to API every 2 hours
setInterval(fetchMarketData, 2 * 60 * 1000); 

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
    fetchMarketData();
});