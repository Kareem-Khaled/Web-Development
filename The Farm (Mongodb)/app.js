// to start server
const express = require('express');
const app = express();

// to use http mehods like (put, patch, delete)
const methodOverride = require('method-override')

// get the path to run from any dir
const path = require('path');

// to use mongodb
const mongoose = require('mongoose');

// to access product db in models folder
const Product = require('./models/product');

// to start connection with mongodb
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
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

// categories of data
const categories = ['fruit', 'vegetable', 'dairy'];

// index - renders all Products (can use query string)
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        Products = await Product.find({ category });
        res.render('products/index', { Products, category });
    }
    else {
        Products = await Product.find({});
        res.render('products/index', { Products, category: 'All' });
    }
})

// new - renders a form 
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

// create - creates a new Product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

// show - details about a specifc Product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    product = await Product.findById(id);
    res.render('products/show', { product });
})

// edit - renders a form to edit a Product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    product = await Product.findById(id);
    res.render('products/edit', { product, categories });
})

// update - updates a specifc Product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/products/${id}`);
})

// delete - removes a Product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('ON PORT 3000');
})