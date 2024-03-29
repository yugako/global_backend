const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
	title: String,
	number: Number,
	price: String,
	amount: Number,
	action: String,
	status: String,
	worker: String
}, {
	timestamps: true,
	collection : 'orders'
});

module.exports = mongoose.model('Order', OrderSchema);