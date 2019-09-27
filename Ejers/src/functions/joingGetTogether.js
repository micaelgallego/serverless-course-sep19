const Log = require('@dazn/lambda-powertools-logger');
const middy = require('middy');
const sns = require('@dazn/lambda-powertools-sns-client')
const correlationIds = require('@dazn/lambda-powertools-middleware-correlation-ids');
const AWSXray = require("aws-xray-sdk");
const epsagon = require("epsagon");

AWSXray.captureAWS(require("aws-sdk"));

epsagon.init({
    token: "860eae1e-f10b-4a0f-ad2f-64e8b73936c2",
    appName: "myApp", // tiene que coincidir en todo el servicio. Crearla en el serverless.yml en el provider.
    metadataOnly: false
});

let handler = async event => {

    console.log('Body: ' + event.body);
    console.log('Topic name: ' + process.env.getTogethersTopicName)

    const user = JSON.parse(event.body);

    const orderId = 'sssss';

    user.orderId = orderId;

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
