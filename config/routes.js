var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users');
var servicesController = require('../controllers/services');

/* GET home page. */
var token = require('../config/token_auth');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users',    usersCtrl.create);
router.get( '/users/me', token.authenticate, usersCtrl.me);

router.post('/token',    token.create);

router.route('/services')

  //GET all services
  .get(servicesController.getAll)

  //POST a new blob
  .post(servicesController.createService);


router.route('/services/:id')

  // GET return specific candy
  .get(servicesController.getService)

  // PATCH update existing candy
  .patch(servicesController.updateService)

  // DELETE remove specific candy from DB
  .delete(servicesController.removeService);

module.exports = router;
