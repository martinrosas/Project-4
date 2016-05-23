require('dotenv').load();
var mongoose = require('./database');

var User = require("../models/user")

var users = [
  {email: "martin@ga.com", name:  "martin"},
  {email: "berns@ga.com", name:  "bern"}
]

//from criminals
User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
      mongoose.connection.close();
    }
    process.exit();
  });
});
