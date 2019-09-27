const middy = require('middy')
const { ssm } = require('middy/middlewares')

console.log('Table name path: '+process.env.getTogethersTableNamePath);

let handler = middy((event, context) => {

    console.log(context.tableNamePath);

    const orderPlaced = JSON.parse(event.Records[0].Sns.Message);

    console.log(orderPlaced);

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

module.exports.handler = handler;
