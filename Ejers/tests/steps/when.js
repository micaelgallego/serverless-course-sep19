//var Promise = this.Promise || require('promise');
var http = require('superagent-promise')(require('superagent'), Promise);

module.exports.we_invoke_getTogether = (name) => {
    const event = { pathParameters: { name: name } };

    const testMode = process.env.TEST_MODE;

    if(testMode === 'handler'){
        return viaHandler("getGetTogether", event);    
    } if(testMode === 'http'){
        return viaHttp('getTogethers');
    } else {
        console.error(`Unrecognized TEST_MODE ${testMode}`);
    }
}

function viaHandler(funcName, event){
    const handler = require(`../../src/functions/${funcName}`);
    console.log(handler);
    return handler.handler(event);
}

async function viaHttp(pathName){

    const url = `https://v43r7coe0d.execute-api.eu-west-1.amazonaws.com/dev/api/${pathName}/`;
    
    const response = await http('GET', url);

    return {
        statusCode: response.status,
        body: JSON.stringify(response.body)
    }
}