const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');

const server = serverlessExpress.createServer(app);

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return await serverlessExpress.proxy(server, event, context, 'PROMISE').promise
};