require('dotenv').load();
var mongoose = require('./database');

var User = require("../models/user")
var Service = require("../models/service")

var users = [
  {email: "martin@ga.com", name:  "martin", services: ["5743a112f9fe66f89fe39425", "5743a112f9fe66f89fe39426"]},
  {email: "berns@ga.com", name:  "bern" }
]

var services = [
  {title: "webdev", location: "LA", categories: "Web Dev"},
  {title: "Need cleaning", location: "East LA", categories: "photography"}
]

//from criminals

Service.create(services, function(err, services) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + services.length + " services.")
    }
  })


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

