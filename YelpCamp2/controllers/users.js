// to access user db from models folder
const User = require('../models/user');

// rendering registering form
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

// registering new user and logging him in and redirect him to all campgrounds page
module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome To YelpCamp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

// rendering login form 
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

// login user
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back');
    // to know if user want to visit page before logging in
    const redirectUrl = (req.session.returnTo || '/campgrounds');
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

// logging user out
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Good Bye');
    res.redirect('/campgrounds');
};