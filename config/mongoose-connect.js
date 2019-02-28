const winston = require('./winston');
const mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('database');

const dbUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

module.exports = function(){

    mongoose.connect(dbUrl,{useNewUrlParser: true});

    mongoose.connection.on('connected', function(){
        winston.log("info", `Mongoose connection is open to ${dbUrl}`);

    });

    mongoose.connection.on('error', function(err){
        winston.log("error", `Mongoose connection has occured ${err} error`);
    });

    mongoose.connection.on('disconnected', function(){
        winston.log("info", `Mongoose connection is disconnected`);
    });
}