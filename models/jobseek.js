var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

//Job schema
var JobseekSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: String,
  price: Number,
  categories: String,
  location: String,
  created: { type: Date, default: Date.now },
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
});


var Jobseek = mongoose.model('Jobseek', JobseekSchema);

module.exports = Jobseek;
