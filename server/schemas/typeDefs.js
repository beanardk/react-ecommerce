const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type Account {
        _id: ID
        password: String
        createdAt: Date
        isAdmin: Boolean
        purchases: []
    }

    type Product {
        name: String
        description: String
        price: Number
        productId: String
        purchases: []
    }

    type Purchases {
        purchasedBy: Account
        purchasedProduct: Product
        purchasedAt: Date
    }
`

module.exports = typeDefs