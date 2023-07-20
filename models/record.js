const mongoose = require('mongoose')

const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    min: '2000-01-01', 
    max: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    min: 1,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)