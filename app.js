const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const { constants } = require('crypto');

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for querying database
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
            next(err); // Pass the error to the error handling middleware
        });
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Error Handler
app.use(errorController.get404);

// Error Handling Middleware
app.use((err, req, res, next) => {
    // Handle errors here
    res.status(500).send('Internal Server Error');
});

// Define associations between models
User.hasMany(Product);
Product.belongsTo(User);
User.hasOne(Cart);
Cart.belongsTo(User);
 Cart.belongsToMany(Product, { through: CartItem });
 Product.belongsToMany(Cart, { through: CartItem });
 (async () => {
    try {
        await sequelize.sync();
        let user = await User.findByPk(1);
        if (!user) {
            user = await User.create({ username: "khaalf", email: "khalaf566@gmail.com" });
           const cart= await user.createCart();
        }
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();