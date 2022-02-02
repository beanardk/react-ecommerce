const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mern-ecommerce",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;
