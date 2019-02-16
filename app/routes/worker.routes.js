const express = require('express');
const router = express.Router();

const Workers = require('../controllers/worker.controller.js');

const workers = new Workers();

// Create a new worker
router.post('/workers', workers.create);

// Retrieve all workeres
router.get('/workers', workers.findAll);

// Retrive a single worker with id
router.get('/workers/:workerId', workers.findOne);

// Update worker with id
router.put('/workers/:workerId', workers.update);

// Delete worker with id
router.delete('/workers/:workerId', workers.delete);

module.exports = router;