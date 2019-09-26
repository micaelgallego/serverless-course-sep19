const when = require(`./steps/when`);

require('./init.js');

describe(`When we invoke the GET /helloWorld endpoint`, () => {
    
    test(`Should return the right greeting`, async () => {

        const response = await when.we_invoke_helloWorld("Manolito");

        expect(response.statusCode).toBe(200);
        
        const body = JSON.parse(response.body);
        
        expect(body.length).toBe(8);

        body.forEach(item => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('description');
        });
    });
});