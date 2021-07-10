const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');

const server = serverlessExpress.createServer({app, resolutionMode: 'CALLBACK' });

exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return serverlessExpress.proxy(server, event, context, 'PROMISE').promise
};