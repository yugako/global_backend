const express = require('express');
const router = express.Router();

const {check} = require('express-validator/check');

const WorkerModel = require('../models/worker.model.js');

const WorkerController = require('../controllers/worker.controller.js');

const workerCtrl = new WorkerController(WorkerModel);

router.get('/workers', workerCtrl.findAll);

router.get('/workers/:itemId', workerCtrl.findOne);

router.post('/workers', [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
			.withMessage('Must be at least 6 chars long')
			.matches(/\d/).withMessage('Must contain a number')
	], workerCtrl.create);

router.put('/workers/:itemId', [
		check('name').isLength({min: 3}),
		check('password').isLength({min: 6})
	], workerCtrl.update);

router.delete('/workers/:itemId', workerCtrl.delete);


module.exports = router;