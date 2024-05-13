const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const sequelize=require('./util/database');
const models=require('./index');


// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Import routes and controllers
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for querying database


// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Error Handler
app.use(errorController.get404);

// Error Handling Middleware


// Sync models with the database
sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Server listening on port 3000`);
        });
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

// Other middleware and routes...



