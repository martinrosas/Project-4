var Employee = require('../models/employee');
// var ObjectID = require('mongoose').Types.ObjectId;

// GET
function getAll(request, response) {
  Employee.find(function(error, employees) {
    if(error) response.json({message: 'Could not find any employee'});

    response.json({employees: employees});
  }).select('-__v');
}

// POST
function createEmployee(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var employee = new Service(request.body);
  console.log(employee)
  employee.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate employee b/c:' + error});

    response.json({employee: employee});
  });
}

// GET
function getEmployee(request, response) {
  var id = request.params.id;

  Employee.findById({_id: id}, function(error, employee) {
    if(error) response.json({message: 'Could not find employee b/c:' + error});

    response.json({employee: employee});
  }).select('-__v');
}

function updateEmployee(request, response) {
  var id = request.params.id;

  Employee.findById({_id: id}, function(error, employee) {
    if(error) response.json({message: 'Could not find employee b/c:' + error});

    if(request.body.name) employee.name = request.body.name;
    if(request.body.start) employee.start = request.body.start;
    if(request.body.end) employee.end = request.body.end;

    employee.save(function(error) {
      if(error) response.json({messsage: 'Could not update employee b/c:' + error});

      response.json({message: 'Employee successfully updated', employee: employee});
    });
  }).select('-__v');
}
function removeEmployee(request, response) {
  var id = request.params.id;

  Employee.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete employee b/c:' + error});

    response.json({message: 'employee successfully deleted'});
  }).select('-__v');
}

module.exports = {
  getAll: getAll,
  createEmployee: createEmployee,
  getEmployee: getEmployee,
  updateEmployee: updateEmployee,
  removeEmployee: removeEmployee
}
