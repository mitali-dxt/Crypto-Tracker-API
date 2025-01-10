const mongoose = require('mongoose');

const marketDataSchema = new mongoose.Schema(
    {
        'bitcoin': {
            current_price: Number,
            market_cap: Number,
            price_change_24h: Number,
        },
        'matic-network': {
            current_price: Number,
            market_cap: Number,
            price_change_24h: Number,
        },
        'ethereum': {
            current_price: Number,
            market_cap: Number,
            price_change_24h: Number,
        },
    },
    {timestamps: true},
);

const marketData = mongoose.model('MarketDataSchema', marketDataSchema);

module.exports = marketData;