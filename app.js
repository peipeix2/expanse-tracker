const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))
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
  let totalAmount = 0
  Record.find()
    .lean()
    .then((records) => {
      records.forEach((record) => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

app.post('/', async (req, res) => {
  try{
    console.log(req.body.category)
    const foundCategory = await Category.findOne({ name: req.body.category }).lean()
    const categoryId = foundCategory._id
    console.log(categoryId)
    await Record.find({ categoryId })
      .lean()
      .then((records) => {
        let totalAmount = 0
        records.forEach((record) => {
          totalAmount += record.amount
        })
        res.render('index', { records, totalAmount })
      })
  } catch (error) {
    console.log(error)
  }
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

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.formattedDate = new Date(record.date).toISOString().split('T')[0]
      console.log(record.formattedDate)
      res.render('edit', { record })
    })
    .catch((err) => console.log(err))
})

app.put('/records/:id', async (req, res) => {
  try{
    const id = req.params.id
    const categoryId = (await Category.findOne({ name: req.body.category }))._id
    await Record.findById(id)
      .then((record) => {
        record.name = req.body.name
        record.date = req.body.date
        record.amount = req.body.amount
        record.categoryId = categoryId
        record.categoryImage = CATEGORY_IMAGE[req.body.category]
        return record.save()
      })
      .then(() => res.redirect('/'))
  } catch(error) {
    console.log(error)
  }
})

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000np')
})