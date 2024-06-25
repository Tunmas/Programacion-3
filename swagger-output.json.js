const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API',
    description: 'Descripción de tu API'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/controllers/models/user.routes.js', './src/controllers/models/task.routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index.js'); // tu archivo principal
});
