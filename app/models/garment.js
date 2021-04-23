const mongoose = require('mongoose')
const garmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  cleaningMethod: {
    type: String,
    required: true
  },
  cleaningStatus: {
    type: String,
    required: true
  },
  wornDate: {
    type: String
  },
  weather: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Garment', garmentSchema)
