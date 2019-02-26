const express = require('express');
const winston = require('./config/winston');
const config = require('config');
const app = express();

const mongoConnect = require('./config/mongoose-connect.js');

const passportConfig = require('./app/authorization/passportAuth.js');

const routesInit = require('./app/routes/index');

const appMiddleware = require('./app/appMiddleware');

const serverConfig = config.get('server');

appMiddleware(app);
mongoConnect();

passportConfig(app);
routesInit(app);

app.listen(serverConfig.port, () => {
	winston.log("info", `App listening at ${serverConfig.port}`);
});