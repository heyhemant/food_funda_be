const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true
    },
});

const restroSchema = new mongoose.Schema({
    restaurant_name: {
        type: String,
        required: true,
        },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    location: {
        type: locationSchema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Restaurant = mongoose.model('Restaurants', restroSchema);

module.exports = Restaurant;
