var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users');
var servicesController = require('../controllers/services');
// var employeesController = require('../controllers/employees');

/* GET home page. */
var token = require('../config/token_auth');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users',    usersCtrl.create);
router.get( '/users/me', token.authenticate, usersCtrl.me);

router.post('/token',    token.create);

router.route('/services')
// router.route('/employees')

  //GET all services
  .get(servicesController.getAll)
  // .get(employeesController.getAll)

  //POST a new blob
  .post(servicesController.createService)
  // .post(employeesController.createEmployee);

  router.get('/member/:id', usersCtrl.show);
  // router.put('/profile/:id', usersCtrl.update);



router.route('/services/:id')
// router.route('/employees/:id')

  // GET return specific candy
  .get(servicesController.getService)
  // .get(employeesController.getEmployee)

  // PATCH update existing candy
  .patch(servicesController.updateService)
  // .patch(employeesController.updateEmployee)

  // DELETE remove specific candy from DB
  .delete(servicesController.removeService)
  // .delete(employeesController.removeEmployee);

module.exports = router;
