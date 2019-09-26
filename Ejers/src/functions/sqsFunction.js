module.exports.handler = event => {

    const orderPlaced = JSON.parse(event.Records[0].Sns.Message);

    console.log(orderPlaced);

};
