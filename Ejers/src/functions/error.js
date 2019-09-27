const middy = require('middy')
const { ssm } = require('middy/middlewares')
const Log = require('@dazn/lambda-powertools-logger');
const correlationIds = require('@dazn/lambda-powertools-middleware-correlation-ids');
const AWSXray = require("aws-xray-sdk");

AWSXray.captureAWS(require("aws-sdk"));

let handler = event => {

    Log.info('Message with error:',event);

};

module.exports.handler = middy(handler).use(correlationIds({ sampleDebugLogRate: 0 }));
