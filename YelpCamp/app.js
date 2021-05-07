if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// to start server
const express = require('express');
const app = express();

// cookies
const session = require('express-session');

// flash
const flash = require('connect-flash');

// to use http mehods like (put, patch, delete)
const methodOverride = require('method-override')

// get the path to run from any dir
const path = require('path');

const ejsMate = require('ejs-mate');

// get routes
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/user');

const ExpressError = require('./utils/ExpressError');

// to use mongodb
const mongoose = require('mongoose');

// authanecation package
const passport = require('passport');
const localStrategy = require('passport-local');

// users
const User = require('./models/user');

// to start connection with mongodb
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// Views folder and EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// to parse form data in POST request body
app.use(express.urlencoded({ extended: true }));

// To 'fake' put/patch/delete requests
app.use(methodOverride('_method'))

app.engine('ejs', ejsMate);
// to use css in public folder
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: "Kemo",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// to send flashes to all templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 400, message = 'something went wrong' } = err;
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})