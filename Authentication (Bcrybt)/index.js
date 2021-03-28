// to start server
const express = require('express');
const app = express();

// get user db
const User = require('./models/user');

// cookies
const session = require('express-session');

// get the path to run from any dir
const path = require('path');

// Views folder and EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// to use mongodb
const mongoose = require('mongoose');

// to start connection with mongodb
mongoose.connect('mongodb://localhost:27017/loginDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// to parse form data in POST request body
app.use(express.urlencoded({ extended: true }));

// session to help cookies
app.use(session({ secret: 'nosecret' }));

// middleware to confirm user login
const requireLogin = (req, res, next) => {
    if (!req.session.user_id)
        return res.render('login');
    next();
}

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findAndValidate(username, password);
    if (user) {
        req.session.user_id = user._id;
        return res.redirect('secret');
    }
    res.redirect('/login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.send(user);
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    //  req.session.destroy();
    res.redirect('/login');
})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})