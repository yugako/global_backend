const express = require('express');
const router = express.Router();


const OrderModel = require('../models/order.model.js');

const OrderController = require('../controllers/order.controller.js');

const orderCtrl = new OrderController(OrderModel);

router.get('/orders', orderCtrl.findAll);

router.get('/orders/:itemId', orderCtrl.findOne);

router.post('/orders', orderCtrl.create);

router.put('/orders/:itemId', orderCtrl.update);

router.delete('/orders/:itemId', orderCtrl.delete);


module.exports = router;