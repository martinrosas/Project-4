var User = require("../models/user");

module.exports = {
  create: create,
  me:     me
};


function create(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var user = new User(request.body);

  user.save(function(error) {
    if (error) response.json({messsage: 'Could not create user b/c:' + error});
    console.log(response)
    response.json(user);
  });
}
// function create(req, res, next) {
//   if (!req.body.password) {
//     return res.status(422).send('Missing required fields');
//   }
//   User
//     .create(req.body)
//     .then(function(user) {
//       res.json({
//         success: true,
//         message: 'Successfully created user.',
//         data: {
//           email: user.email,
//           id:    user._id
//         }
//       });
//     }).catch(function(err) {
//       if (err.message.match(/E11000/)) {
//         err.status = 409;
//       } else {
//         err.status = 422;
//       }
//       next(err);
//     });
// };

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
