const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/food_funda', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Mongo successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connectToDB };