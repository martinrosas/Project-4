var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
  content: String,
  postedBy: {type: Schema.Types.ObjectId, ref: 'User'}
});
var Review = mongoose.model('Message', MessageSchema);
