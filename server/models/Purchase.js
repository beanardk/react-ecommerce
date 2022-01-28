const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
    purchasedBy: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },

    purchasedProduct: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },

    purchasedAt: {
        type: Date,
        default: Date.now
    }
});

const Purchase = model('Purchases', purchaseSchema);

module.exports = Purchase;
