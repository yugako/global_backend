const express = require('express');
const router = express.Router();

const Valid = require('../../config/validation');

const WorkerModel = require('../models/worker.model.js');

const Auth = require("../controllers/auth.controller.js");

const authWorkers = new Auth(WorkerModel);

router.post('/users', Valid.auth, authWorkers.register);

router.get('/users', authWorkers.findAll);

router.get('/users/:itemId', authWorkers.findOne);

router.put('/users/:itemId', Valid.auth, authWorkers.update);

router.delete('/users/:itemId', authWorkers.delete);

router.post('/login', authWorkers.login);

router.get('/logout', authWorkers.logout);


module.exports = router;