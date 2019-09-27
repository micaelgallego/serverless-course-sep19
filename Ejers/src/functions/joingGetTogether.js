const AWS = require("aws-sdk");

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

    await sns.publish(params).promise();
    
    const res = {
        statusCode: 200,
        body: orderId
    };

    return res;
};
