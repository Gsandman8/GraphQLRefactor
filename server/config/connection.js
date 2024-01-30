const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhostgh:27017/googlebooks');

module.exports = mongoose.connection;
