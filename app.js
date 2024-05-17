const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./util/database');
const Product = require('./models/product');
const Cart=require('./models/cart');
const Cartitems=require('./models/cart-item');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const order=require('./models/order');
const orderlist=require('./models/order.item');
const { USE } = require('sequelize/lib/index-hints');

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for querying database and setting user on request object
app.use(async (req, res, next) => {
    try {
        const user = await User.findByPk(1);
        if (user) {
            req.user = user;
        }
        next();
    } catch (err) {
        console.error('Error fetching user:', err);
        next(err);
    }
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Error Handler
app.use(errorController.get404);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).send('Internal Server Error');
});

// Define associations between models
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
Product.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product,{through:Cartitems});
Product.belongsToMany(Cart,{through:Cartitems});
order.belongsTo(User);
User.hasMany(order);
order.belongsToMany(Product,{through:orderlist});
Product.belongsToMany(order,{through:orderlist});

// Sync database and start server
(async () => {
    try {
        await sequelize.sync();
        let user = await User.findByPk(1);
        if (!user) {
            user = await User.create({ username: 'khalaf', email: 'khalaf566@gmail.com' });
            let cart=await user.createCart();
        }
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();
