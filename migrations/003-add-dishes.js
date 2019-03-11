'use strict';

const dishes = require('../init_db_data/dishes');

const connection = require('../init_db_data/set_connection');

exports.up = function(next){
	connection(dishes, 'dishes');
  	next();
};

exports.down = function(next){
  next();
};