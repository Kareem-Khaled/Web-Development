// get the path to run from any dir
const curPath = require('path');

// to use http mehods like (put, patch, delete)
const methodOverride = require('method-override')

// to genetate unique id
const { v4: uuid } = require('uuid');

// to start server
const express = require('express');
const app = express();

// to parse form data in POST request body
app.use(express.urlencoded({ extended: true }))

// to parse incoming JSON in POST request body
app.use(express.json())

// To 'fake' put/patch/delete requests
app.use(methodOverride('_method'))

// Views folder and EJS setup
app.set('view engine', 'ejs');
app.set('views', curPath.join(__dirname, '/views'));

// Our fake db
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

// index - renders all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

// new - renders a form 
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// create - creates a new comment
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ id: uuid(), username, comment });
    res.redirect('/comments');
})

// show - details about a specifc comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

// edit - renders a form to edit a comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

// update - updates a specifc comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    const newComment = req.body.comment;
    comment.comment = newComment;
    res.redirect('/comments')
})

// delete - removes a comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})

app.listen(3000, () => {
    console.log("On Port 3000");
})