const { Purchase, Product, Account } = require('../models')

const resolvers = {
    Query: {
        test: () => {
            return 'working query'
        }
    },

    Mutation: {
        test: () => {
            return 'working Mutation'
        }
    }
}

module.exports = resolvers