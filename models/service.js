var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

//Job schema
var ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: String,
  price: Number,
  categories: String,
  location: String,
  created: { type: Date, default: Date.now },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});


var Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
