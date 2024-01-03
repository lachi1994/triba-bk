const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Triba Express API',
    description: 'This is the API documentation of the triba project endpoints.',
    version: '1.0.0',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'UcPro',
      url: 'https://ucpro.in',
      email: 'info@email.com',
    },
    basePath: '/',
  },
  servers: [
    {
      url: 'https://triba-bk.herokuapp.com',
      description: 'Development server',
    },
  ],
};

const option = {
  explorer: true,
  swaggerDefinition,
  apis: [
    path.resolve(__dirname, '../routes/api/user.js'),
  ],
};

module.exports = option;
