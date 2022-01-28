const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:20GgrNkplXGiyKMp@cluster0.0wu5d.mongodb.net/Ecommerce-Database?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
);

module.exports = mongoose.connection;
