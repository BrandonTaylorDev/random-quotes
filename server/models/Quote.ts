import mongoose from 'mongoose'

export const Quote = mongoose.model('Quote', new mongoose.Schema({
  quote: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  }
}))
