const db = require('./connection');
const { User, Stock, Coin } = require('../models');

db.once('open', async () => {
  await Stock.deleteMany();

  const stocks = await Stock.insertMany([
    { name: 'AAPL' },
    { name: 'AAL' },
    { name: 'MSFT' },
    { name: 'VZ' },
    { name: 'TSLA' },
    { name: 'MRNA' },
    { name: 'FB' },
    { name: 'JNJ' },
    { name: 'GOOG' },
    { name: 'AMZN' }
  ]);

  console.log('Stocks seeded');

  await Coin.deleteMany();
  await Coin.create({
    date: "2021-09-02",
    name: "Bitcoin",
    price: 49688,
    qty: "2",
    symbol: "btc",
    user: '612be194e1bfb70f202814b8'
  });


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
