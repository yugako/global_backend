const mongoose = require('mongoose');
const config = require('config');
const winston = require('../config/winston');

const {host, port, name} = config.get('database');

module.exports = (obj, collection) => {
	mongoose.connect(`mongodb://${host}:${port}/${name}`, {useNewUrlParser: true});

	mongoose.connection.on('connected', () => {
	    winston.log("info", `Mongoose connection is open`);
	    
	    if (Array.isArray(obj)) {
	    	mongoose.connection.db.collection(collection).insert(obj);
	    } else {
	    	mongoose.connection.db.collection(collection).insertOne(obj);
	    }
	});
}

