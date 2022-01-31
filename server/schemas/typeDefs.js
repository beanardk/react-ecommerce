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
        email: String
        password: String
        createdAt: Date
        isAdmin: Boolean
        cart: [Product]
        purchases: [Purchases]
    }

    type Product {
        name: String
        description: String
        price: Float
        productId: String
        priceId: String
        purchases: [Purchases]
    }

    type Purchases {
        purchasedBy: Account
        purchasedProduct: Product
        purchasedAt: Date
    }

    type Auth {
        token: ID!
        account: Account
    }

    type Query {
        getAccount(accountId: ID): Account
        getAllAccounts: [Account]
        getProduct(productId: ID): Product
        getAllProducts: [Product]
        getPurchase(purchaseId: ID): Purchases
        getAllPurchases: [Purchases]
        createCheckout: String
    }

    type Mutation {
        addAccount(email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createProduct(name: String!, description: String!, price: Float!): Product
    }
`

module.exports = typeDefs