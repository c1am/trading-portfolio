const db = require('./connection');
const { User, Stocks } = require('../models');

db.once('open', async () => {
  await Stocks.deleteMany();

  const stocks = await Stocks.insertMany([
    { name: 'AMC' },
    { name: 'AMD' },
    { name: 'F' },
    { name: 'PLTR' },
    { name: 'AAPL' },
    { name: 'BAC' },
    { name: 'SAVA' },
    { name: 'EDU' },
    { name: 'CCL' },
    { name: 'T' },
    { name: 'PTON' },
    { name: 'BABA' },
    { name: 'WISH' },
    { name: 'PFE' },
    { name: 'NVDA' },
    { name: 'ABEV' },
    { name: 'HPQ' },
    { name: 'AAL' },
    { name: 'GPS' },
    { name: 'MSFT' },
    { name: 'OXY' },
    { name: 'XOM' },
    { name: 'GM' },
    { name: 'WFC' },
    { name: 'M' },
    { name: 'NOK' },
    { name: 'INTC' },
    { name: 'UBER' },
    { name: 'VZ' },
    { name: 'TSLA' },
    { name: 'MRNA' },
    { name: 'C' },
    { name: 'CSCO' },
    { name: 'CMCSA' },
    { name: 'FB' },
    { name: 'BP' },
    { name: 'IBM' },
    { name: 'GE' },
    { name: 'WMT' },
    { name: 'JNJ' },
    { name: 'GOOG' },
    { name: 'AMZN' },
    { name: 'LNKD' },
  ]);

  console.log('Stocks seeded');

  await User.deleteMany();
  await User.create({
    firstName: 'Manzur',
    lastName: 'Shaheed',
    email: 'mshaheed@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
