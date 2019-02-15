const mongoose = require('mongoose');

const WorkerSchema = mongoose.Schema({
	name: String,
	password: String,
}, {
	timestamps: true,
	collection : 'workers'
});

module.exports = mongoose.model('Worker', WorkerSchema);