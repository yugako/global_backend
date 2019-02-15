const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
	name: String,
	password: String,
}, {
	timestamps: true,
	collection : 'orders'
});

module.exports = mongoose.model('Order', OrderSchema);