const swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
const swaggerDefinition = {
    info: {
        title: 'Restaurant service API',
        version: '1.0.0',
        description: 'Describe RESTful API of Restaurant service',
    },
    host: 'localhost:3000',
    basePath: '/',
};
// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./**/routes/*.js'], // pass all in array 
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;