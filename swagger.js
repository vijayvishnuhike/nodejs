const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Carequality APIs',
    description: 'Description'
  },
  host: 'localhost:5000'
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen(outputFile, routes, doc).then(()=>{
  require('./app.js')
});