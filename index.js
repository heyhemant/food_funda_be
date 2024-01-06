const express = require('express');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { connectToDB } = require('./services/connect');
const authRouter = require('./components/restraunt_management/auth/routes/auth_route');
const menuRouter = require('./components/menu_management/routes/menu_routes');
const app = express();

app.listen(3000, async ()  => {
    await connectToDB();
    console.log('Server is running on port 3000');
});

app.use(express.json());
app.use(express.urlencoded());
app.use('/auth', authRouter);
app.use('/menu', menuRouter);

app.route('/hemant').get(async (req, res)  => {
    try {
        const token = jwt.sign({id: `${req.body.id}`}, process.env.JWT_SECRET);
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        console.log(decoded.id);
        return res.json({ decoded: decoded });
    } catch (error) {
        console.error('Invalid token.');
        return res.json({ error: error });
    }
    res.send('Hello World');
});