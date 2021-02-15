// to start server
const express = require("express");
const app = express();

// get the path to run from any dir
const curPath = require('path');

// get the data from data.json file
const allData = require('./data.json');

// Views folder and EJS setup
app.set('view engine', 'ejs');
app.set('views', curPath.join(__dirname, '/views'));
app.use(express.static(curPath.join(__dirname, 'public')));

// home page 
app.get('/', (req, res) => {
  res.render('home');
})
// /r/*
app.get('/r/:sub', (req, res) => {
  const { sub } = req.params;
  const data = allData[sub];
  if (data) // (...) to get all the properties out and deal with them directly
    res.render('temp', { ...data });
  else
    res.render('error', { sub });
})

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
})