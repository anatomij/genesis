var LocalStrategy   = require('passport-local').Strategy;
var User = require('./../db/config').User;
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

module.exports = function (passport) {
	passport.use('signin', new LocalStrategy(function (username, password, done) {
    User.findOne({username: username}, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        done(null, user);
      });
    });
  }));
}
