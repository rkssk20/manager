const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
];

serverlessExpress({app, resolutionMode: 'CALLBACK'});

// exports.handler = (event, context) => serverlessExpress.proxy(server, event, context);