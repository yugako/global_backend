const express = require('express');
const router = express.Router();

let passport = require('passport');
require('../../config/passport')(passport);

const OrderModel = require('../models/order.model.js');

const OrderController = require('../controllers/order.controller.js');

const orderCtrl = new OrderController(OrderModel);

router.get('/orders', passport.authenticate('jwt', {session: false}), orderCtrl.findAll);

router.get('/orders/:itemId', passport.authenticate('jwt', {session: false}), orderCtrl.findOne);

router.post('/orders', orderCtrl.create);

router.put('/orders/:itemId', passport.authenticate('jwt', {session: false}), orderCtrl.update);

router.delete('/orders/:itemId', passport.authenticate('jwt', {session: false}), orderCtrl.delete);


module.exports = router;