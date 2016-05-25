var User = require("../models/user");

module.exports = {
  create: create,
  me:     me,
  show: show
};



function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          email: user.email,
          id:    user._id
        }
      });
    }).catch(function(err) {
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};

function me(req, res, next) {
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully retrieved user data.',
        data: user
      });
    })
    .catch(function(err) {
      next(err);
    });
};

function show(request, response) {
  console.log("show user")
  User.findById(request.params.id)
  // .populate('services')
  .exec(function(error, user) {
    Service.find({ userId: request.params.id })
    if(error) response.json({message: 'Could not find user b/c:' + error});

    response.json(user);
  });
}
