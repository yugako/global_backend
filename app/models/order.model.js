const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
	list: Object,
	price: String
}, {
	timestamps: true,
	collection : 'orders'
});

module.exports = mongoose.model('Order', OrderSchema);