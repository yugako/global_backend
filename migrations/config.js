module.exports = {
	server: {
  		host: process.env.HOST || '127.0.0.1',
  		port: process.env.PORT || 3000,
  		mode: process.env.NODE_ENV || 'development'
  	},
  	database: {
    	host: process.env.DB_HOST || '127.0.0.1',
    	port: process.env.DB_PORT || 27017,
    	name: process.env.DB_NAME || 'service'
  	},
  	log: {
  		path: process.env.LOG_PATH || 'logs/',
  		combined: process.env.LOG_COMBINED || 'combined.log',
  		error: process.env.LOG_ERROR || 'error.log'
  	}
};