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
      // coin.save(function (err, data) {
      //   if (err) return console.error(err);
      //   console.log(data.name + " saved to coins collection.");
      // });
      // console.log({coin});
      try {
        response = await Coin.create(coin);
        console.log(response);
        return response;
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
  }
};

module.exports = resolvers;
