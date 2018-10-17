const nodemailerMock = require('nodemailer-mock');
const request = require('supertest');
const knex = require('../../../db/knex');

describe('/api/accounts/password', () => {

    let server = null;

    beforeAll(() => {
        jest.doMock('nodemailer', () => {
            return nodemailerMock;
        });
    });

    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        nodemailerMock.mock.reset();
        server.close();
    });

    afterAll(() => {
        jest.dontMock('nodemailer');
    });

    it('should return error with a given invalid username', async () => {
        // Given
        let forgotPasswordRequest = { 
            username: 12345
        };

        // When
        const res = await request(server).post('/api/accounts/forgotpassword').send(forgotPasswordRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(9);
    });

    it('should return error with a given invalid email', async () => {
        // Given
        let forgotPasswordRequest = { 
            email: 12345
        };

        // When
        const res = await request(server).post('/api/accounts/forgotpassword').send(forgotPasswordRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(10);
    });

    it('should return error with a given valid but not existing username', async () => {
        // Given
        let forgotPasswordRequest = { 
            username: 'not existing'
        };

        // When
        const res = await request(server).post('/api/accounts/forgotpassword').send(forgotPasswordRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(9);
    });

    it('should return error with a valid but not exisging email', async () => {
        // Given
        let forgotPasswordRequest = { 
            email: 'not@existing.com'
        };

        // When
        const res = await request(server).post('/api/accounts/forgotpassword').send(forgotPasswordRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(10);
    });

    it('Should sent the forgot password mail when a valid username is given', async () => {
        // Given
        let forgotPasswordRequest = { 
            username: 'test1'
        };

        // When
        const res = await request(server).post('/api/accounts/forgotpassword').send(forgotPasswordRequest);

        // Then
        expect(res.status).toBe(200);

        const sentMail = nodemailerMock.mock.sentMail();
        expect(sentMail.length).toBe(1);
        expect(sentMail[0].from).toBe(process.env.MAIL_FROM);
        expect(sentMail[0].to).toBe('test1@mail.com');
        expect(sentMail[0].subject).toBe('GZM: Forgot password confirmation');
    });

    it('Should sent the forgot password mail when a valid username is given', async () => {
        // Given
        let forgotPasswordRequest = { 
            email: 'test2@mail.com'
        };

        // When
        const res = await request(server).post('/api/accounts/forgotpassword').send(forgotPasswordRequest);

        // Then
        expect(res.status).toBe(200);

        const sentMail = nodemailerMock.mock.sentMail();
        expect(sentMail.length).toBe(1);
        expect(sentMail[0].from).toBe(process.env.MAIL_FROM);
        expect(sentMail[0].to).toBe('test2@mail.com');
        expect(sentMail[0].subject).toBe('GZM: Forgot password confirmation');
    });

    it('Should return the expected error when sending the mail fails', async () => {
        // Given
        nodemailerMock.mock.shouldFailOnce();
        let forgotPasswordRequest = { 
            email: 'test2@mail.com'
        };

        // When
        const res = await request(server).post('/api/accounts/forgotpassword').send(forgotPasswordRequest);

        // Then
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(14);
    });
});