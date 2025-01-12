# Crypto Price Tracker API

## Overview

This project implements a server-side application using **Node.js** and **MongoDB**. The application fetches the latest data (price, market cap, and 24-hour price change) for three cryptocurrencies — Bitcoin, Matic, and Ethereum — from the **CoinGecko API**. The data is stored in a MongoDB database and updated every 2 hours. The application also provides two APIs for querying the latest cryptocurrency data and calculating the price deviation based on the stored records.

## Features

- **Background Job**: Periodically fetches cryptocurrency data and stores it in MongoDB every 2 hours.
- **API `/stats`**: Returns the latest data about a requested cryptocurrency (Bitcoin, Matic, or Ethereum).
- **API `/deviation`**: Calculates and returns the standard deviation of the price for the requested cryptocurrency from the last 100 records.

## Deployments

### 1. Stats API
- [http://13.126.35.81:8001/api/stats?coin=bitcoin](http://13.126.35.81:8001/api/stats?coin=bitcoin)
- Change the query parameter coin to one of bitcoin, matic-network or ethereum and test the same
- Sample response:
```
{
    "price": 94292,
    "marketCap": 1867699422612,
    "24hChange": 0.07585
}
```

 
### 2. Deviation API
- [http://13.126.35.81:8001/api/deviation?coin=bitcoin](http://13.126.35.81:8001/api/deviation?coin=bitcoin)
- Change the query parameter coin to one of bitcoin, matic-network or ethereum and test the same
- Sample response:
```
{
  "deviation": 30.4236749916903
}
```

### 3. MongoDB Atlas
- The database is deployed on MongoDB Atlas Cluster


  
## Installation

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (version 14.x or above)
- **MongoDB** (hosted on MongoDB Atlas)

### Steps (To test on local machine)

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/crypto-price-tracker.git
    cd crypto-price-tracker
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root of the project and adding the following:

    ```
    MONGO_URI=your_mongodb_connection_string
    gecko_api=https://api.coingecko.com/api/v3/coins/markets
    ```

4. Start the server:
    ```bash
    npm start
    ```
## Conclusion

This project demonstrates how to fetch real-time cryptocurrency data, store it in a database, and expose it via REST APIs. The background job runs periodically to ensure the data is up-to-date, and the APIs allow users to query the latest market stats and price deviation.
