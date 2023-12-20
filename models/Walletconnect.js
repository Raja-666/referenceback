
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  walletAddress: {
    userId: String, 
    address: String,
    connectedAt: { type: Date, default: Date.now },
  },
  // Add other user details as needed
});

const User = mongoose.model('wallet', walletSchema);

module.exports = walletSchema;
