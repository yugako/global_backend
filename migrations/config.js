const config = require('config');

const {host, port, name} = config.get('database');

module.exports = {
  development : `mongodb://${host}:${port}/${name}`,
}