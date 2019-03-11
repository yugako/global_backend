const winston = require('./winston');
const mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('database');

const dbUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

const options = {
  autoIndex: true, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true
};

module.exports = function(){

    mongoose.connect(dbUrl, options);

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