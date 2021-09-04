const { AuthenticationError } = require('apollo-server-express');
const { response } = require('express');
const { User, Coin } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    coins: async (parent, args, context) => {
      if (context.user) {
        const coins = await Coin.find({user: context.user._id});
        return coins;
      }
      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      for (let i = 0; i < coins.length; i++) {
        const coin = await stripe.coins.create({
          name: coins[i].name,
          description: coins[i].description,
          images: [`${url}/images/${coins[i].image}`]
        });

        const price = await stripe.prices.create({
          coin: coin.id,
          unit_amount: coins[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    }, 
    buyCoins: async (parent, { symbol, name, price, qty, date, user }, context) => {
      // console.log(context);
      console.log("buy coin");
      var coin = {
        symbol: symbol,
        name: name,
        price: price,
        qty: qty,
        date: date,
        user: user
      };
      try {
        return await Coin.create(coin);
      } catch (error) {
        console.log(error);
      }
    }, 
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateCoins: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await coins.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    }
  }
};

module.exports = resolvers;
