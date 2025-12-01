const mongoose = require('mongoose');

// /Users/eve.zheng/dev/nodemongo-crud/config/db.js

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nodemongo-crud';
const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // other options can go here
};

// connectedDb is a Promise that resolves to mongoose.connection once connected
const connectedDb = (async () => {
    try {
        await mongoose.connect(MONGODB_URI, options);
        const db = mongoose.connection;
        db.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        db.once('open', () => {
            console.info('Connected to MongoDB');
        });
        return db;
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
})();

module.exports = { connectedDb };

module.exports = {
    url: MONGODB_URI
}