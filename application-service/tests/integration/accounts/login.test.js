const request = require('supertest');
const knex = require('../../../db/knex');

let server;
describe('/api/accounts/login', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    describe('POST /', () => {
        it('should login account with the given valid credentials', async () => {
            // Given
            let account = { 
                email: 'test1@mail.com', 
                password: 'test'
            };

            // When
            const res = await request(server).post('/api/accounts/login').send(account);

            // Then
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });


        it('should return error when given email is not valid', async () => {
            // Given
            let account = { 
                email: 'invalid mail',
                password: 'test' };

            // When
            const res = await request(server).post('/api/accounts/login').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(10);
        });

        it('should return error when given password is not valid', async () => {
            // Given
            let account = { 
                email: 'test@mail.com',
                password: 9999 };

            // When
            const res = await request(server).post('/api/accounts/login').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(11);
        });

        it('should return error when given email is not registed', async () => {
            // Given
            let account = { 
                email: 'no@registedmail.com',
                password: 'test' };

            // When
            const res = await request(server).post('/api/accounts/login').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(1);
        });


        it('should return error when given password is not correct', async () => {
            // Given
            let account = { 
                email: 'test1@mail.com',
                password: 'incorrect password' };

            // When
            const res = await request(server).post('/api/accounts/login').send(account);

            // Then
            expect(res.status).toBe(400);
            expect(res.body.code).toBe(1);
        });
    });
});