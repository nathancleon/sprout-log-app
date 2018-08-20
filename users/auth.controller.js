const userModel = require('./users.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = function(req, res) {
  if(!req.body.email) {
    res.status(404).json({
      message: 'you must include an email'
    });
    return;
  }
  userModel.findOne({
    email: req.body.email
  })
  .then((user) => {
    if(user) {
      res.status(401).json({
        message: 'user already exists'
      });
      return;
    }
    let newUser = new userModel();
    newUser.email = req.body.email;
    newUser.name = req.body.name;
    bcrypt.hash(req.body.password, 10)
      .then((hashPassword) => {
        newUser.password = hashPassword;
        newUser.save()
          .then(() => {
            res.status(200).json({
              message: 'user created correctly'
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: 'unable to save user'
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'bcrypt has failed'
        });
      });
  })
  .catch(() => {
    res.status(500).json({
      message: 'could not find user'
    });
  });
};

exports.loginUser = function(req, res) {
  if(!req.body.email) {
    res.status(404).json({
      message: 'you must include an email'
    });
    return;
  }
  userModel.findOne({
    email: req.body.email
  })
  .then((user) => {
    if(!user) {
      res.status(401).json({
        message: 'user does not exist'
      });
      return;
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(401).json({
        message: 'password does not match'
      });
      return;
    }
    const tokenObject = {
      email: user.email,
      id: user._id
    };
    const token = jwt.sign(tokenObject, '123');
    res.status(200).json({
      message: 'user logged in correctly',
      data: {
        userID: user._id,
        token: token,
        email: user.email
      }
    });
  })
  .catch((error) => {
    res.status(500).json({
      message: 'could not find user'
    });
  });
};
