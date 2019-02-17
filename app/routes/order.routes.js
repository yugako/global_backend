const express = require('express');
const router = express.Router();

let passport = require('passport');
require('../../config/passport')(passport);

const OrderModel = require('../models/order.model.js');

const OrderController = require('../controllers/order.controller.js');

const orderCtrl = new OrderController(OrderModel);

router.get('/orders', passport.authenticate('jwt', {session: false}), (req, res) => {
	let token = getToken(req.headers);
	if (token) {
		orderCtrl.findAll;
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized'});
	}
});
router.get('/orders/:itemId', passport.authenticate('jwt', {session: false}), (req, res) => {
	let token = getToken(req.headers);
	if (token) {
		orderCtrl.findOne;
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized'});
	}
});

router.post('/orders', orderCtrl.create);

router.put('/orders/:itemId', passport.authenticate('jwt', {session: false}), (req, res) => {
	let token = getToken(req.headers);
	if (token) {
		orderCtrl.update;
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized'});
	}
});

router.delete('/orders/:itemId', passport.authenticate('jwt', {session: false}), (req, res) => {
	let token = getToken(req.headers);
	if (token) {
		orderCtrl.delete;
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized'});
	}
});

getToken = (headers) => {
	if (headers && headers.authorization) {
		let parted = headers.authorization.split(' ');
		    if (parted.length === 2) {
		      return parted[1];
		    } else {
		      return null;
		    }
	} else {
		return null;
	}
}

module.exports = router;