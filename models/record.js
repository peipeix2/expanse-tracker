const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    min: '2023-01-01', 
    max: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})