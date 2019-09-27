const AWS = require("aws-sdk");
const Log = require('@dazn/lambda-powertools-logger');
const middy = require('middy');

const correlationIds = require('@dazn/lambda-powertools-middleware-correlation-ids');

let handler = async event => {

    console.log('Body: '+event.body);
    console.log('Topic name: '+process.env.getTogethersTopicName)

    const user = JSON.parse(event.body);    

    const orderId = 'sssss';

    user.orderId = orderId;

    const sns = new AWS.SNS();

    const params = {
        Message: JSON.stringify(user),
        TopicArn: process.env.getTogethersTopic
    }

    await sns.publish(params).promise();

    Log.info("published 'master_enrolled' event", params);
    
    const res = {
        statusCode: 200,
        body: orderId
    };

    return res;
};

module.exports.handler = middy(handler).use(correlationIds({ sampleDebugLogRate: 0 }));
