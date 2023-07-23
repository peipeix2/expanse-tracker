const bcrypt = require('bcryptjs')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const CATEGORY_IMAGE = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}

const db = require('../../config/mongoose')


db.once('open', async () => {
  console.log('mongodb connected!')
  try {
    const SEED_RECORD = [
      {
        name: '午餐',
        date: '2019-4-23',
        amount: 60,
        categoryId: (await Category.findOne({ name: '餐飲食品' }))._id,
        categoryImage: CATEGORY_IMAGE.餐飲食品,
        userId: (await User.findOne({ name: '廣志' }))._id
      },
      {
        name: '晚餐',
        date: '2019-4-23',
        amount: 60,
        categoryId: (await Category.findOne({ name: '餐飲食品' }))._id,
        categoryImage: CATEGORY_IMAGE.餐飲食品,
        userId: (await User.findOne({ name: '廣志' }))._id
      },
      {
        name: '捷運',
        date: '2019-4-23',
        amount: 120,
        categoryId: (await Category.findOne({ name: '交通出行' }))._id,
        categoryImage: CATEGORY_IMAGE.交通出行,
        userId: (await User.findOne({ name: '廣志' }))._id
      },
      {
        name: '電影：驚奇隊長',
        date: '2019-4-23',
        amount: 220,
        categoryId: (await Category.findOne({ name: '休閒娛樂' }))._id,
        categoryImage: CATEGORY_IMAGE.休閒娛樂,
        userId: (await User.findOne({ name: '小新' }))._id
      },
      {
        name: '租金',
        date: '2015-4-01',
        amount: 25000,
        categoryId: (await Category.findOne({ name: '家居物業' }))._id,
        categoryImage: CATEGORY_IMAGE.家居物業,
        userId: (await User.findOne({ name: '廣志' }))._id
      }
    ]
    const categories = Category.find()
    if (categories.length === 0) {
      console.log('No categories found. Please run categorySeeder FileSystemDirectoryEntry.')
      process.exit()
    }
    await Record.create(SEED_RECORD)
      .then(() => {
        console.log('Done. Record seeded.')
        process.exit()
      })
  } catch (error) {
    console.log(error);
    process.exit();
}
})