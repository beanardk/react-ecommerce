const { gql } = require('apollo-server-express');

const { GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
        return new Date(value);
    },

    serialize(value) {
        return value.toISOString();
    }
})

const typeDefs = gql`
    scalar Date

    type Account {
        _id: ID
        password: String
        createdAt: Date
        isAdmin: Boolean
        purchases: [Purchases]
    }

    type Product {
        name: String
        description: String
        price: Float
        productId: String
        purchases: [Purchases]
    }

    type Purchases {
        purchasedBy: Account
        purchasedProduct: Product
        purchasedAt: Date
    }

    type Query {
        test: String
    }

    type Mutation {
        test: String
    }
`

module.exports = typeDefs