const mongoose = require('mongoose');

const { Schema } = mongoose;

const coinSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Coin = mongoose.model('Coins', coinSchema);

module.exports = Coin;
