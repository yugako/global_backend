const Order = require('../models/order.model.js');

class Orders {
	create (req, res) {
		// Validate request
		if (!req.body.name) {
			return res.status(400).send({
				message: 'Order cannot be unnamed'
			});
		}

		//Create a order
		const order = new Order({
			name: req.body.name,
			password: req.body.password,
		});

		order.save()
			.then(data => {
				res.send(data);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occured while creating new order"
				});
			});
	}
	findAll (req, res) {
		Order.find()
			.then(orders => {
				res.send(orders);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occured while retrieving orders"
				})
			})
	}
	findOne (req, res)  {
		Order.findById(req.params.orderId)
			.then(order => {
				if (!order) {
					return res.status(404).send({
						message: "Order not found id" + req.params.orderId
					});
				}

				res.send(order);
			}).catch(err => {
				if(err.kind === 'ObjectId') {
					return res.status(404).send({
						message: 'Order not found with id ' + req.params.orderId
					});
				}

				return res.status(500).send({
					message: 'Error retrieving order with id ' + req.params.orderId
				})
			})
	}
	update (req, res) {
		// Validate request
		if (!req.body.name) {
			return res.status(400).send({
				message: 'Order content cannot be unnamed'
			});
		}
		// Find order and update it with the request body
		Order.findByIdAndUpdate(req.params.orderId, {
			name: req.body.name,
			password: req.body.password,
		}, {new: true})
		.then(order => {
			if (!order) {
				return res.status(404).send({
					message: "Order not found with id " + req.params.orderId
				});
			}
			res.send(order);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Order not found with id " + req.params.orderId
				})
			}

			return res.status(500).send({
				message: 'Error updating order with id ' + req.params.orderId
			})
		})
	}
	delete (req, res) {
		Order.findByIdAndRemove(req.params.orderId)
			.then(order => {
				if (!order) {
					return res.status(404).send({
						message: "Order not found with id " + req.params.orderId
					})
				}
				res.send({message: 'Order deleted successfully'});
			}).catch(err => {
				if(err.kind === 'ObjectId' || err.name === 'NotFound') {
					return res.status(404).send({
						message: "Order not found with id " + req.params.orderId
					})
				}
				return res.status(500).send({
		            message: "Could not delete order with id " + req.params.orderId
		        });
			})
	}
}

module.exports = Orders;