const express = require('express');
const router = express.Router();

const Valid = require('../../config/validation');

const WorkerModel = require('../models/worker.model.js');

const Auth = require("../controllers/auth.controller.js");

const authWorkers = new Auth(WorkerModel);

// route for register action
router.post('/register', Valid.auth, authWorkers.register);

router.get('/users', authWorkers.findAll);

router.get('/users/:itemId', authWorkers.findOne);

router.put('/users/:itemId', Valid.auth, authWorkers.update);

router.delete('/users/:itemId', authWorkers.delete);

// route for login action
router.post('/login', authWorkers.login);

// route for logout action
router.get('/logout', authWorkers.logout);


module.exports = router;