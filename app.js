const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const connect = require('./util/database').connect;
const User = require('./models/user');

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(async (req, res, next) => {
    try {
        const user = await User.fetchOne('6661d574ff095b27d7083c45');
        if (user) {
            req.user = new User(user.userName, user.userEmail, '6661d574ff095b27d7083c45',user.cart);

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
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

// Define associations between models

(async () => {
    try {
        await connect();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (err) {
        throw new Error('Failed to connect to the database: ' + err.message);
    }
})();
