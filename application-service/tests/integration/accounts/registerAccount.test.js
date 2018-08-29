const request = require('supertest');
const knex = require('../../../db/knex');

let server;
describe('/api/accounts', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    describe('POST /', () => {
        it('should create account with the given valid parameters', async () => {
            // Given
            let account = { 
                username: 'test', 
                email: 'dummy@test.com',
                password: '12345' };

            // When
            const res = await request(server).post('/api/accounts').send(account);

            // Then
            expect(res.status).toBe(200);
            //const resFetch = await request(server).get('/api/items');
            //expect(resFetch.body.items.length).toEqual(3);
        });
    });
});
