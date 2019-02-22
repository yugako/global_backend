const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('./config/winston');
const config = require('config');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const mongoConnect = require('./config/mongoose-connect.js');

const passportConfig = require('./config/passport.js');

const routesInit = require('./app/routes/index');

const serverConfig = config.get('Development.serverConfig');

mongoConnect();

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


passportConfig(app);
routesInit(app);


app.listen(serverConfig.port, () => {
	winston.log("info", `App listening at ${serverConfig.port}`);
});