const { AuthenticationError } = require('apollo-server-express');
const { Purchase, Product, Account } = require('../models');
const { signToken } = require('../util/auth');
const { toCent } = require('../util/cents')

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const resolvers = {
    Query: {
        /* Accounts */
        getAccount: (parent, { accountId }) => {
            return Account.findById(accountId)
        },

        getAllAccounts: () => {
          return Account.find({})
        },
        
        /* Products */
        getProduct: (parent, { productId }) => { // Product ID is referring to the stripe product id
          return Product.findOne({ productId })
        },

        getAllProducts: () => {
          return Product.find({})
        },

        /* Purchases */
        getPurchase: (parent, { purchaseId }) => {
          return Purchase.findById(purchaseId)
        },

        getAllPurchases: () => {
          return Purchase.find({})
        },

        /* Stripe */
        createCheckout: async (parent, { accountId }) => {
            let account = await getAccount(accountId)

            const session = await stripe.checkout.sessions.create({
              mode: "payment",
              success_url: `${process.env.BASE_URL}/success`,
              cancel_url: `${process.env.BASE_URL}/cancel`,
              shipping_address_collection: ["US", "CA"],
              line_items: account.cart.map(item => {
                let obj = {}

                obj.price = item.priceId
                obj.quantity = item.quantity

                return obj
              })
            })

            return session.url
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

        /* Stripe */
        createProduct: async (parent, { name, description, price }) => {
          const stripeProduct = await stripe.products.create({
            name: name,
            description: description,
            shippable: true
          });

          const stripePrice = await stripe.prices.create({
            unit_amount: toCent(price),
            currency: 'usd',
            product: stripeProduct.id
          })

          let savedProduct = await Product.create({
            name,
            description,
            price,
            productId: stripeProduct.id,
            priceId: stripePrice.id
          })

          return savedProduct
        }
    }
}

module.exports = resolvers