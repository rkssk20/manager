const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');

const server = serverlessExpress.createServer(app);

exports.handler = serverlessExpress.proxy({
  server,
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