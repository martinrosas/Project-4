var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

//Job schema
var EmployeeSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: String,
  price: Number,
  categories: String,
  location: String,
  created: { type: Date, default: Date.now },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
