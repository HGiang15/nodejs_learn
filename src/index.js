const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
// const { engine } = require('express-handlebars'); 
const app = express()
const port = 3001

// Khai bao path nghia la localhost:3001 la public
app.use(express.static(path.join(__dirname, 'public')))

// HTTP logger
app.use(morgan('combined'))

// Template engine
// app.engine('handlebars', handlebars());
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
})                      
app.get('/news', (req, res) => {
  console.log(req.query.q);
  res.render('news');
})  
app.get('/blog', (req, res) => {
  res.render('blog');
})      
app.get('/search', (req, res) => {
  res.render('search');
})   
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})      