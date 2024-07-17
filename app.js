const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user'); // Adjust the path to your User model
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRouter = require('./routes/auth');
const errorController = require('./controllers/error');
const csurf = require('csurf');
const flash = require('connect-flash');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// MongoDB Store for session storage
const store = new MongoDBStore({
    uri: 'mongodb+srv://khalaf:khalaf2002@onlinestore.ggfotk8.mongodb.net/shop?retryWrites=true&w=majority&appName=OnlineStore',
    collection: 'sessions'
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware setup
app.use(session({
    secret: 'khalaf@2002',
    resave: false,
    saveUninitialized: false,
    store: store
}));

// CSRF Protection middleware against in any Non Get Request
app.use(csurf());
// Handle flash messages saved in the session
app.use(flash());
app.use((req, res, next) => {// keys in any rendering page
    res.locals.csrfToken = req.csrfToken();
    res.locals.isAuthenticated = req.session.isAuthenticated;
    next();
});

app.use(async (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    try {
        const user = await User.findById(req.session.user._id);
        if (!user) {
            return next();
        }
        req.user = user;
        next();
    }
    catch (err) {
        const error=new Error(err);
        error.httpStatusCode=500;
        return next(error);
    }
})

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRouter);
app.get('/500', errorController.get505);
app.use((error, req, res, next) => {
    res.redirect('/500');
})
// 404 Error Handler
app.use(errorController.get404);

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://khalaf:khalaf2002@onlinestore.ggfotk8.mongodb.net/shop?retryWrites=true&w=majority&appName=OnlineStore', {})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
