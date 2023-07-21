const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const CATEGORY_IMAGE = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', async (req, res) => {
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
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.formattedDate = new Date(record.date).toISOString().split('T')[0]
      res.render('edit', { record })
    })
    .catch((err) => console.log(err))
})

router.put('/:id', async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router