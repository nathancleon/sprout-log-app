let localStrategy = require('passport-local').Strategy;

let user = require('./users.models');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.user('local-signup', new localStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email' : email }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already in use'));
      } else {
        
        let newUser = new User();

        

      }  
    })
  }

  ))






}