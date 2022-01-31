const { AuthenticationError } = require('apollo-server-express');
const { Purchase, Product, Account } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        test: () => {
            return 'working query'
        }
    },

    Mutation: {
        addAccount: async (parent, { email, password }) => {
            const user = await Account.create({ email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await Account.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
    }
}

module.exports = resolvers