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

    stripeCustomerId: {
        type: String
    },

    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],

    purchases: [
        {
            type: Schema.Types.ObjectId,
            ref: "Purchases"
        }
    ]
});

accountSchema.pre('save', async (next) => {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
    
accountSchema.methods.isCorrectPassword = async (password) => {
    return bcrypt.compare(password, this.password);
};

const Account = model('Account', accountSchema);

module.exports = Account;