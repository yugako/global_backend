// Setup mongoose
const mongoose = require('mongoose')     
const config = require('config');

const User = require('../app/models/worker.model');
const dbConfig = config.get('database');

// const dbUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

exports.up = function(next){
	mongoose.connect('mongodb://127.0.0.1:27017/service', {useNewUrlParser: true});

	const adminUser = new User({
		username: 'denystormborn',
		name: 'Dayneris Targarien',
		password: 'ironthrone1',
		role: 'admin'
	});  
  	adminUser.save(function(err) {
    	if (err)  {
       		mongoose.disconnect();  
       		return next(err);
    	}
    	console.log('Saved');
    	mongoose.disconnect();  

 	});
 	next();
  
};

exports.down = function(next){
	next();
};
