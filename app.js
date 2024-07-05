const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoDBStore=require('connect-mongodb-session')(session);
const User = require('./models/user'); // Adjust the path to your User model
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRouter = require('./routes/auth');
const errorController = require('./controllers/error');
const { request } = require('http');

const app = express();
app.set('view engine','ejs');
app.set('views','views');
// MongoDB Store for session storage
const store=new MongoDBStore({
    uri:'mongodb+srv://khalaf:khalaf2002@onlinestore.ggfotk8.mongodb.net/shop?retryWrites=true&w=majority&appName=OnlineStore',
    collection:'sessions'
})

// Session middleware setup
app.use(session({
    secret:'khalaf@2002',
    resave:false,
    saveUninitialized:false,
    store:store
}))
app.use(async (req, res, next) => {
    try {
        if (req.session && req.session.user && req.session.user._id) {
            const user = await User.findById(req.session.user._id);
            if (user) {
                req.user = user;
            } else {
                // Handle the case where the user is not found in the database
                req.user = null;
            }
        } else {
            // Handle the case where there is no session or user id
            req.user = null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        req.user = null;
    }
    next();
});


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRouter);

// 404 Error Handler (if you have one)
// app.use(errorController.get404);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://khalaf:khalaf2002@onlinestore.ggfotk8.mongodb.net/shop?retryWrites=true&w=majority&appName=OnlineStore', {

})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
