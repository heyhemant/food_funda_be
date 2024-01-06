const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    itemId: {
        unique: true,
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const menuSchema = new mongoose.Schema({
    menuItems: [menuItemSchema],
    restrauntId: {
        unique: true,
        type: String,
        required: true
    }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = { Menu };

