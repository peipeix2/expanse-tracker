const mongoose = require('mongoose')
const Record = require('../record')
const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const SEED_CATEGORY = [
  { name: '家居物業' },
  { name: '交通出行' },
  { name: '休閒娛樂' },
  { name: '餐飲食品' },
  { name: '其他' }
]

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(SEED_CATEGORY)
    .then(() => {
      console.log('Done. Category seeded.')
      process.exit()
    })
    .catch((err) => {
      console.error(err)
      process.exit(1) 
    })
})