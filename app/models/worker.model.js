const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const WorkerSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
}, {
	timestamps: true,
	collection : 'workers'
});

WorkerSchema.pre('save', function (next) {
	let worker = this;

	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, (err,salt) => {
			if (err) {
				return next(err);
			}
			bcrypt.hash(worker.password, salt, null, function (err, hash) {
				if (err) {
					return next(err);
				}
				worker.password = hash;
				next();
			})
		})
	} else {
		return next();
	}
});

WorkerSchema.methods.comparePassword = function (passw, cb) {
	bcrypt.compare(passw, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	})
}

module.exports = mongoose.model('Worker', WorkerSchema);