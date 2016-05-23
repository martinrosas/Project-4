var Service = require('../models/service');

// GET
function getAll(request, response) {
  Service.find(function(error, services) {
    if(error) response.json({message: 'Could not find any service'});

    response.json({services: services});
  }).select('-__v');
}

// POST
function createService(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var service = new Service(request.body);
  console.log(service)
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
