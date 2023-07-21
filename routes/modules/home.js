const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const foundCategory = await Category.findOne({ name: req.body.category }).lean()
    const categoryId = foundCategory._id
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

module.exports = router