const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

// Load up user model

const WorkerModel = require('../app/models/worker.model.js');

const settings = require('./settings');

module.exports = function (passport) {
	let opts = {};

	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
	
	opts.secretOrKey = settings.secret;

	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		WorkerModel.findOne({id: jwt_payload.id}, (err, worker) => {
			if (err) {
				return done(err, false);
			}
			if (worker) {
				done(null, worker);
			} else {
				done(null, false);
			}
		})
	}))
}