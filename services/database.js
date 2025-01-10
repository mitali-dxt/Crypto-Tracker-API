const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = async () => {
    try {
        // Get MongoDB URI from environment variable
        const mongoURI = process.env.MONGODB_URI
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = {connectToMongoDB};