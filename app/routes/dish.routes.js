const express = require('express');
const router = express.Router();

const DishModel = require('../models/dish.model.js');

const DishController = require('../controllers/dish.controller.js');

const dishCtrl = new DishController(DishModel);

router.get('/dishes', dishCtrl.findAll);

router.get('/dishes/:itemId', dishCtrl.findOne);

router.post('/dishes', dishCtrl.create);

router.put('/dishes/:itemId', dishCtrl.update);

router.delete('/dishes/:itemId', dishCtrl.delete);


module.exports = router;