const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const winston = require('../config/winston');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

module.exports = app => {

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));

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