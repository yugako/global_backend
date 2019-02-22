const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/models/worker.model.js');


module.exports = function (app) {
	app.use(passport.initialize());
	app.use(passport.session());
	// passport configuration

	passport.use(new LocalStrategy({
		passReqToCallback: true
	},
	  function(req,username, password, done) {
	    User.findOne({ username: username, role: req.body.role}, function (err, user) {
	      if (err) { return done(err); }
	      if (!user) { return done(null, false); }
	      if (user.password !== password || user.role !== req.body.role) { 
	      	return done(null, false); 
	      }
	      return done(null, user);
	    });
	  }
	));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
}