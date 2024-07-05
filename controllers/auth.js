const User = require('../models/user');

// Render login page
exports.getLogIn = (req, res, next) => {
    console.log(req.session.isAuthenticated);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isAuthenticated  // Assuming isAuthenticated is set correctly
    });
}

// Handle login POST request
exports.postLogIn = async (req, res, next) => {
    try {
        // Replace with your actual logic to find user by username or email
        const user = await User.findById('666b5c71e4d3ef298ace702e'); // Replace with dynamic retrieval logic

        if (!user) {
            // Handle case where user is not found
            return res.redirect('/login'); // Redirect to login page or handle accordingly
        }

        req.session.user = user; // Set user in session
        req.session.isAuthenticated = true; // Example: Set isAuthenticated flag
        await req.session.save();
        res.redirect('/shop'); // Redirect to shop page after successful login
    } catch (err) {
        console.error('Error fetching user:', err);
        // Handle error (e.g., redirect to error page or show error message)
        res.redirect('/login'); // Redirect to login page on error
    }
}

// Handle logout GET request
exports.postLogOut = (req, res, next) => {
    console.log(1);
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/shop'); // Redirect to shop page after logout
    });
}
