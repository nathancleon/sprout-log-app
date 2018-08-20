const express = require('express');
const authController = require('./auth.controller');
const passport = require('passport');
let router = express.Router();

// router.post('/register', authController.registerUser);

// router.post('/login', authController.loginUser);

router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/login', function(req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
  
  res.render('signup.ejs', { message: req.flash('signupMessage') });

});

router.get('/profile', isLoggedin, function(req, res) {
  res.render('profile.js', {
    user: req.user
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

function isLoggedin(req, res, next) {
  
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

module.exports = router;