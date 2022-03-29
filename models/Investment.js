const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentSchema = new Schema({
  name: String, 
  description: String, 
  address: String,
  value: Number
}, {
  timestamps: true,
});

module.exports = mongoose.model('Investment', investmentSchema); 
