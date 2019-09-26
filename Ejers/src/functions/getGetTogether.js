const AWS = require("aws-sdk");

module.exports.handler = async event => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const req = {
        TableName: process.env.getTogethersTableName,
        Limit: 8
    };

    const resp = await dynamodb.scan(req).promise();
    
    const res = {
        statusCode: 200,
        body: JSON.stringify(resp.Items)
    };

    return res;
};
