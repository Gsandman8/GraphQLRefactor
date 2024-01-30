const mongoose = require('mongoose');

const connection = mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = connection;
