const mongoose = require('mongoose');

async function connection() { await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');}

module.exports = connection;
