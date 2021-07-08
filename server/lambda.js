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

const server = serverlessExpress.createServer(app);

exports.handler = (event, context, callback) => {
  server.then(result => {
    console.log(result);

    var response = {
      "statusCode": 200,
      "body": JSON.stringify(result),
      "isBase64Encoded": false
    };

    callback(null, response);
  }).catch(error => {
    callback(error);
  })
  // serverlessExpress.proxy(server, event, callback)
};