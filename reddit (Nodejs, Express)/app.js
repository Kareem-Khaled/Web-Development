const express = require("express");
const app = express();
const curPath = require('path');
const allData = require('./data.json');


app.set('view engine', 'ejs');
app.set('views', curPath.join(__dirname, '/views'));
app.use(express.static(curPath.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('home');
})

app.get('/r/:sub', (req, res) => {
  const { sub } = req.params;
  const data = allData[sub];
  if (data)
    res.render('temp', { ...data });
  else
    res.render('error', { sub });

})

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
})