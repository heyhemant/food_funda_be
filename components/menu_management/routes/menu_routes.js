const express = require('express');
const menuRoute = express.Router();
const { getMenu, createMenu } = require('../controller/menu_controller');

// Create a menu item
menuRoute.post('/', createMenu);

// Update a menu item
menuRoute.put('/:id', (req, res) => {
    const menuId = req.params.id;
    // Add your code to update the menu item with the given ID here
    res.send(`Menu item ${menuId} updated`);
});

// Remove a menu item
menuRoute.delete('/:id', (req, res) => {
    const menuId = req.params.id;
    // Add your code to remove the menu item with the given ID here
    res.send(`Menu item ${menuId} removed`);
});

// Get all menu items
menuRoute.get('/', getMenu);

module.exports = menuRoute;
