const express = require('express');
const router = express.Router();

const {check} = require('express-validator/check');

const DishModel = require('../models/dish.model.js');

const DishController = require('../controllers/dish.controller.js');

const dishCtrl = new DishController(DishModel);

router.get('/dishes', dishCtrl.findAll);

router.get('/dishes/:itemId', dishCtrl.findOne);

router.post('/dishes', [
		check('title').isLength({ min: 3 }),
		check('price').isNumeric(),
		check('weight').isNumeric(),
	], dishCtrl.create);

router.put('/dishes/:itemId', [
		check('title').isLength({ min: 3 }),
		check('price').isNumeric(),
		check('weight').isNumeric(),
	], dishCtrl.update);

router.delete('/dishes/:itemId', dishCtrl.delete);


module.exports = router;