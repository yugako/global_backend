const express = require('express');
const router = express.Router();

const Dishes = require('../controllers/dish.controller.js');

const dishes = new Dishes();

router.post('/dishes', dishes.create);

// Retrieve all dishes
router.get('/dishes', dishes.findAll);

// Retrive a single dish with id
router.get('/dishes/:dishId', dishes.findOne);

// Update dish with id
router.put('/dishes/:dishId', dishes.update);

// Delete dish with id
router.delete('/dishes/:dishId', dishes.delete);

module.exports = router;
