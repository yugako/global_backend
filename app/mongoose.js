//require mongoose module
const mongoose = require('mongoose');

//require database URL from properties file
const dbConfig = require('../config/database.config.js');

//export this function and imported by server.js
module.exports = function(){

    mongoose.connect(dbConfig.url,{useNewUrlParser: true});

    mongoose.connection.on('connected', function(){
        console.log(("Mongoose connection is open to ", dbConfig.url));
    });

    mongoose.connection.on('error', function(err){
        console.log(("Mongoose connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(("Mongoose connection is disconnected"));
    });
}