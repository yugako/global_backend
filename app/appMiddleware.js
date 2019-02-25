const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swagger = require('../config/swagger');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const winston = require('../config/winston');

module.exports = app => {
    app.use(express.static(path.join(__dirname, '../public')));

    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swagger);
    });

    app.use(morgan('combined', {
        stream: winston.stream
    }));
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cors());

    app.use(cookieParser());

    app.use(require('express-session')({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
}