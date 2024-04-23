const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs=require('fs');
const app = express();

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Import routes and controllers
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorcontroller = require('./controllers/error');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Error Handler
app.use(errorcontroller.get404);

// Start server
app.listen(3000, () => {
    console.log("This app is listening on port 3000");
});
