const middy = require('middy')
const { ssm } = require('middy/middlewares')
const Log = require('@dazn/lambda-powertools-logger');
const correlationIds = require('@dazn/lambda-powertools-middleware-correlation-ids');

console.log('Table name path: '+process.env.getTogethersTableNamePath);

let handler = middy((event, context) => {

    Log.info(event);

    Log.info(context.tableNamePath);

    const orderPlaced = JSON.parse(event.Records[0].Sns.Message);

    Log.info(orderPlaced);

});

handler.use(

    ssm({
        cache: true,
        cacheExpiryInMillis: 3 * 60 * 1000,
        setToContext: true,
        names: {
            tableNamePath: process.env.getTogethersTableNamePath
        }
    })
)

module.exports.handler = middy(handler).use(correlationIds({ sampleDebugLogRate: 0 }));
