const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user'); // Adjust the path to your User model
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const app = express();

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware to fetch user by ID
app.use(async (req, res, next) => {
    try {
        const user = await User.findById('666b5c71e4d3ef298ace702e'); // Replace with your actual user ID retrieval logic
        req.user = user; // Set req.user to the fetched user
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error('Error fetching user:', err);
        next(err); // Pass the error to the error handling middleware
    }
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Error Handler
app.use(errorController.get404);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://khalaf:khalaf2002@onlinestore.ggfotk8.mongodb.net/shop?retryWrites=true&w=majority&appName=OnlineStore'
  
)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
