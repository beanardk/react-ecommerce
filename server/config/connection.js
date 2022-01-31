const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect("mongodb://localhost/mern-ecommerce",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;
