const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
    email: {
        type: String,
        required: 'No email provided.',
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },

    purchases: [
        {
            type: Schema.Types.ObjectId,
            ref: "Purchases"
        }
    ]
});

const Account = model('Account', accountSchema);

module.exports = Account;
