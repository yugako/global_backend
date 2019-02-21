const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');
const WorkerModel = require('../models/worker.model.js');

const Auth = require("../controllers/auth.controller.js");

const authWorkers = new Auth(WorkerModel);

// route for register action
router.post('/register', [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
			.withMessage('Must be at least 6 chars long')
			.matches(/\d/).withMessage('Must contain a number')
	], authWorkers.register);

router.get('/users', authWorkers.findAll);

router.get('/users/:itemId', authWorkers.findOne);

router.put('/users/:itemId', [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
	], authWorkers.update);

router.delete('/users/:itemId', authWorkers.delete);

// route for login action
router.post('/login', authWorkers.login);

// route for logout action
router.get('/logout', authWorkers.logout);


module.exports = router;