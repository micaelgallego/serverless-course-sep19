module.exports.we_invoke_helloWorld = (name) => {
    const event = { pathParameters: { name: name } };
    return viaHandler("helloWorld", event);
}

function viaHandler(funcName, event){
    const handler = require(`../../src/functions/${funcName}`);
    return handler.handler(event);
}