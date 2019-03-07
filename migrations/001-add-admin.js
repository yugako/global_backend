'use strict';

const admin = require('../init_db_data/admin');

const connection = require('../init_db_data/set_connection');

exports.up = function(next){
	connection(admin, 'workers');
  	next();
};

exports.down = function(next){
  next();
};