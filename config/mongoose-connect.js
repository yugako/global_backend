//require mongoose module
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const dbUrl = `mongodb://${config.database.host}:${config.database.port}/${config.database.db}`;
//require database URL from properties file
//export this function and imported by server.js
module.exports = function(){

    mongoose.connect(dbUrl,{useNewUrlParser: true});

    mongoose.connection.on('connected', function(){
        console.log(("Mongoose connection is open to ", dbUrl));
    });

    mongoose.connection.on('error', function(err){
        console.log(("Mongoose connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(("Mongoose connection is disconnected"));
    });
}