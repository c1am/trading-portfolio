const mongoose = require('mongoose');
const User = require('./User');

const { Schema } = mongoose;

const coinSchema = new Schema({
  symbol: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.001
  },
  qty: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Coin = mongoose.model('Coins', coinSchema);

module.exports = Coin;
