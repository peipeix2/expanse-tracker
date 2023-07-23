const express = require('express')
const session = require('express-session')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const usePassport = require('./config/passport')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(routes)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000np')
})