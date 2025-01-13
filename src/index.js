const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
// const { engine } = require('express-handlebars');
const route = require('./routes')
const db = require('./config/db')

db.connect() // Connect to DB

const app = express()
const port = 3001

app.use(express.static(path.join(__dirname, 'public')))

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

app.use(morgan('combined')) // HTTP logger

// Template engine
// app.engine('handlebars', handlebars());
// app.engine(
//   'hbs',
//   handlebars.engine({
//     extname: '.hbs',
//   }),
// )

// Định nghĩa helper eq
const hbs = handlebars.create({
  extname: '.hbs',
  helpers: {
    eq: function(a, b) {
      return a === b;
    },
  },
});

// Cấu hình express với Handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app) // route init

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
