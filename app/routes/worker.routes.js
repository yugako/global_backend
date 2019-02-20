const express = require('express');
const router = express.Router();

const {check} = require('express-validator/check');

let passport = require('passport');
require('../../config/passport')(passport);

const WorkerModel = require('../models/worker.model.js');

const WorkerController = require('../controllers/worker.controller.js');

const workerCtrl = new WorkerController(WorkerModel);

router.get('/workers', passport.authenticate('jwt', {session: false}), workerCtrl.findAll);

router.get('/workers/:itemId', passport.authenticate('jwt', {session: false}), workerCtrl.findOne);

router.post('/workers', passport.authenticate('jwt', {session: false}), [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
			.withMessage('Must be at least 6 chars long')
			.matches(/\d/).withMessage('Must contain a number')
	], workerCtrl.create);

router.put('/workers/:itemId', passport.authenticate('jwt', {session: false}), [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
	], workerCtrl.update);

router.delete('/workers/:itemId', passport.authenticate('jwt', {session: false}), workerCtrl.delete);


module.exports = router;