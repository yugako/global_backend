const mongoose = require('mongoose');

const passport = require('passport');

const settings = require('../../config/settings');

require('../../config/passport')(passport);

const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const Worker = require("../models/worker.model.js");

const Admin = require("../models/admin.model.js");

router.post('/login', function (req, res) {
	Worker.findOne({
		name: req.body.name
	}, function (err, worker) {
		if (err) {
			throw err;
		}
		if (!worker) {
			res.status(401).send({
				success: false, 
				msg: 'Authentication failed. User not found'
			});
		} else {
			// If password mathches
			worker.comparePassword(req.body.password, function (err, isMatch) {
				if (isMatch && !err) {
					// If everything ok
					let token = jwt.sign(worker.toJSON(), settings.secret);
					// Return info including token as Json
					res.json({
						success: true,
						token: 'JWT ' + token,
						name: req.body.name,
						role: req.body.role
					});
				} else {
					res.status(401).send({
						success: false,
						msg: 'Authentication failed. Wrong password.'
					});
				}
			});
		}
	});
});

router.post('/login-admin', function (req, res) {
	Admin.findOne({
		name: req.body.name
	}, function (err, admin) {
		if (err) {
			throw err;
		}
		if (!admin) {
			res.status(401).send({
				success: false, 
				msg: 'Authentication failed. User not found'
			});
		} else {
			// If password mathches
			admin.comparePassword(req.body.password, function (err, isMatch) {
				if (isMatch && !err) {
					// If everything ok
					let token = jwt.sign(admin.toJSON(), settings.secret);
					// Return info including token as Json
					res.json({
						success: true,
						token: 'JWT ' + token,
						name: req.body.name,
						role: req.body.role
					});
				} else {
					res.status(401).send({
						success: false,
						msg: 'Authentication failed. Wrong password.'
					});
				}
			});
		}
	});
});

module.exports = router;