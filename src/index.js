const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
// const { engine } = require('express-handlebars');
const route = require('./routes')
const db = require('./config/db')

// Connect to DB
db.connect()

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
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app) // route init

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
