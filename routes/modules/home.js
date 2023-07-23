const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  Record.find({userId})
    .lean()
    .then((records) => {
      records.forEach((record) => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

router.post('/', async (req, res) => {
  try {
    const userId = req.user._id
    const foundCategory = await Category.findOne({ name: req.body.category }).lean()
    const categoryId = foundCategory._id
    await Record.find({ userId, categoryId })
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

module.exports = router