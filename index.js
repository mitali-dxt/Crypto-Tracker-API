const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./connect');

const routes= require('./routes/route');
const fetchDataRoute = require('./routes/fetchdata');

const app = express();
const port = 3000;

//connect to MongoDB using Mongoose
connectToMongoDB('mongodb://127.0.0.1:27017/Market-Data').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

app.use(express.json());
app.use(bodyParser.json());

//fetch market data of coins manually 
app.use('/fetchData', fetchDataRoute);

//routes for the API for task 2 and task 3
app.use('/api', routes);

//runs the background job to fetch coins data
require('./services/fetchData'); 

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});