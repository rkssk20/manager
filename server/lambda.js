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

serverlessExpress({
  app,
  eventSource: {
    getRequest: alb.getRequest,
    getResponse: ({
        statusCode,
        body,
        headers,
        isBase64Encoded
    }) => {
        const multiValueHeaders = {};
        Object.entries(headers).forEach(([headerKey, headerValue]) => {
            const headerArray = Array.isArray(headerValue) ? headerValue : [String(headerValue)];
            multiValueHeaders[headerKey.toLowerCase()] = headerArray;
        });
        return {
            statusCode,
            body,
            multiValueHeaders,
            isBase64Encoded
        }
    }
  }
});

// exports.handler = (event, context) => serverlessExpress.proxy(server, event, context);