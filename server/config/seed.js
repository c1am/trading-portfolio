const db = require('./connection');
const { User, Coin } = require('../models');

db.once('open', async () => {

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
