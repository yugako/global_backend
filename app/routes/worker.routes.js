const express = require('express');
const router = express.Router();

const WorkerModel = require('../models/worker.model.js');

const WorkerController = require('../controllers/worker.controller.js');

const workerCtrl = new WorkerController(WorkerModel);

router.get('/workers', workerCtrl.findAll);

router.get('/workers/:itemId', workerCtrl.findOne);

router.post('/workers', workerCtrl.create);

router.put('/workers/:itemId', workerCtrl.update);

router.delete('/workers/:itemId', workerCtrl.delete);


module.exports = router;