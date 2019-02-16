const express = require('express');
const router = express.Router();

const Orders = require('../controllers/order.controller.js');

const orders = new Orders();
// Create a new worker
router.post('/orders', orders.create);

// Retrieve all workeres
router.get('/orders', orders.findAll);

// Retrive a single worker with id
router.get('/orders/:orderId', orders.findOne);

// Update worker with id
router.put('/orders/:orderId', orders.update);

// Delete worker with id
router.delete('/orders/:orderId', orders.delete);

module.exports = router;