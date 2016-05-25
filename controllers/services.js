var Service = require('../models/service');
var User = require('../models/user')

// var ObjectID = require('mongoose').Types.ObjectId;

// GET
function getAll(request, response) {
//   var populateQuery = [{path:'books', select:'title pages'}, {path:'movie', select:'director'}];

// Person.find({})
//  .populate(populateQuery)
//  .execPopulate()
  var populateQuery = [{path:'userId', select:'email'}];
  Service.find({}, function(error, services) {
    if(error) response.json({message: 'Could not find any service'});

    // get all the users
    User.find({}, function (error, users) {
      if (error) response.json(error)

      // create an obj with keys as user ids and values as emails
      var emails = {}
      users.forEach(function (user) {
        emails[user._id] = user.email
      })

      // DO THIS ON THE FRONTEND INSTEAD
      // // match the email to the userId in the service
      // services.forEach(function (service) {
      //   service.email = emails[service.userId]
      // })


      response.json({services: services , emails: emails});
    })
  }).select('-__v');
}

// POST
function createService(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var service = new Service(request.body);
  console.log(service)
  console.log(request.decoded)
  //
  service.userId = request.decoded._id
  service.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate service b/c:' + error});

    response.json({service: service});
  });
}

// GET
function getService(request, response) {
  var id = request.params.id;

  Service.findById({_id: id}, function(error, service) {
    if(error) response.json({message: 'Could not find service b/c:' + error});

    response.json({service: service});
  }).select('-__v');
}

function updateService(request, response) {
  var id = request.params.id;

  Service.findById({_id: id}, function(error, service) {
    if(error) response.json({message: 'Could not find service b/c:' + error});

    if(request.body.name) service.name = request.body.name;
    if(request.body.start) service.start = request.body.start;
    if(request.body.end) service.end = request.body.end;

    service.save(function(error) {
      if(error) response.json({messsage: 'Could not update service b/c:' + error});

      response.json({message: 'Service successfully updated', service: service});
    });
  }).select('-__v');
}
function removeService(request, response) {
  var id = request.params.id;

  Service.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete service b/c:' + error});

    response.json({message: 'service successfully deleted'});
  }).select('-__v');
}

module.exports = {
  getAll: getAll,
  createService: createService,
  getService: getService,
  updateService: updateService,
  removeService: removeService
}
