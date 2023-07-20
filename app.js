const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const CATEGORY_IMAGE = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexes: true })


const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
  
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', async (req, res) => {
  try {
    const categoryId = (await Category.findOne({ name: req.body.category }))._id
    await Record.create({
      name: req.body.name,
      date: req.body.date,
      amount: req.body.amount,
      categoryId: categoryId,
      categoryImage: CATEGORY_IMAGE[req.body.category]
    })
    res.redirect('/')
  } catch(error) {
    console.log(error)
  }
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000np')
})