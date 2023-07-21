const Record = require('../record')
const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_CATEGORY = [
  { name: '家居物業' },
  { name: '交通出行' },
  { name: '休閒娛樂' },
  { name: '餐飲食品' },
  { name: '其他' }
]

const db = require('../../config/mongoose')

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