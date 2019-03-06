// Setup mongoose
const mongoose = require('mongoose')     
const config = require('config');

const User = require('../app/models/worker.model');
const dbConfig = config.get('database');

const dbUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;



exports.up = function(next){
	mongoose.connect(dbUrl);
	mongoose.connection.on('connected', function(){
	        console.log("info", `Mongoose connection is open to ${dbUrl}`);
	});

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
    	mongoose.disconnect();  

 	});
 	next();
  
};

exports.down = function(next){
	next();
};
