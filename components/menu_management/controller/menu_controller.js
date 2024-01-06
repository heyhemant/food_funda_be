const { Menu, MenuItem } = require('../models/menu_schema');
const Restaurant = require('../../restraunt_management/models/restaurant_schema');

// GET /menu
async function getMenu(req, res) {
    const body = req.body;
    const restroId = body.restraunt_id;
    if (!body || !restroId) {
        return res.status(400).json({ message: "Please Scan Again" });
    }
    try {
        const restaurant = await Restaurant.findById(restroId);
        if (!restaurant) {
            return res.status(400).json({ message: "Restaurant Not Found" });
        }
        const menu = await Menu.findOne({ restrauntId: restaurant._id });
        if (!menu) {
            return res.status(400).json({ message: "Menu Not Found" });
        }
        return res.status(200).json({ menu: menu });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /menu
async function createMenu(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "User Not Logged In" });
    }
    const body = req.body;
    if (!body || !body.menuItems) {
        return res.status(400).json({ message: "Please Enter Menu Items" });
    }
    try {
        const restoMenu = await Menu.findOne({ restrauntId: body.restrauntId });
        if (restoMenu) {
            console.log('ha bhau menu already exists    ');
            return res.status(400).json({ message: "Menu Already Exists" });
        }
        const menu = new Menu({
            restrauntId: body.restrauntId,
            menuItems: JSON.parse(body.menuItems)
        });
        await menu.save();
        return res.status(200).json({ message: "Menu Created" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// PUT /menu
async function updateMenuItem(req, res) {
    const body = req.body;
    const newMenuItems = body.menuItems;
    const restrauntId = body.restrauntId;

    if (!body || !restrauntId || !menuItems) {
        return res.status(400).send({ message: "Please Enter Menu Items" });
    }
    try {
        const menu = await menuSchema.findOne({ restrauntId: restrauntId });
        if (!menu) {
            return res.status(400).send({ message: "Menu Not Found" });
        }
        const menuItems = menu.menuItems;
        newMenuItems.forEach(async (menuItem) => {
            const menuItemId = menuItem.itemId;
            const mymenuItem = await MenuItem.findOneAndUpdate({ itemId: menuItemId }, {
                name: body.name,
                description: body.description,
                price: body.price,
                isAvailable: body.isAvailable
            });
            await mymenuItem.save();
        });
        // const menuItem = await MenuItem.findOneAndUpdate({ itemId: menuItemId }, {
        //     name: body.name,
        //     description: body.description,
        //     price: body.price,
        //     isAvailable: body.isAvailable
        // });
        // await menuItem.save();
        return res.status(200).send({ message: "Menu Updated" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }

};

// DELETE /menu/:id
async function deleteMenu(req, res) {
    const menuId = req.params.id;
    await MenuItem.deleteOne({ itemId: menuId });
    await Menu.deleteOne({ menuItems: menuId });
};

module.exports = {
    getMenu,
    createMenu,
    // updateMenu,
    deleteMenu
};
