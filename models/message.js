const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* MESSAGES SCHEMA */
const Message = new Schema({
  customer: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  service: {
    type: String,
    enum: ['Welding', 'Woodwork', 'Mechanic'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', Message);