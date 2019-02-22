const winston = require('./winston');

//require mongoose module
const mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('Development.dbConfig');

const dbUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;
//require database URL from properties file
//export this function and imported by server.js
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