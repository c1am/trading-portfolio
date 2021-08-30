const mongoose = require('mongoose');

const { Schema } = mongoose;

const stockSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Stock = mongoose.model('Stocks', stockSchema);

module.exports = Stock;
