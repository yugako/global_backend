const config = require('config');
const winston = require('winston');

const logs = config.get('log');
const mode = config.get('server.mode');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'Restaurant service' },
  transports: [
    new winston.transports.File({ filename: `${logs.path}${logs.error}`, level: 'error' }),
    new winston.transports.File({ filename: `${logs.path}${logs.combined}` })
  ]
});

if (mode !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};
module.exports = logger;