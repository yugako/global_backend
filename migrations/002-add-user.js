'use strict';

const worker = require('../init_db_data/worker');

const connection = require('../init_db_data/set_connection');

exports.up = function(next){
	connection(worker, 'workers');
  	next();
};

exports.down = function(next){
  next();
};