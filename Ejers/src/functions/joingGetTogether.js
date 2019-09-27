const AWS = require("aws-sdk");
const Log = require('@dazn/lambda-powertools-logger');

module.exports.handler = async event => {

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

    Log.info("published 'master_enrolled' event", user);

    await sns.publish(params).promise();
    
    const res = {
        statusCode: 200,
        body: orderId
    };

    return res;
};
