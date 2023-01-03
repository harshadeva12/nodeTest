const app = require('./server.js');
const request = require("supertest");

describe('described test set', () => {

    it('GET', async () => {
        const { body, statusCode } = await request(app).get('/get-object');
        expect(statusCode).toBe(200)
    });

    it('GET null', async () => {
        const { body, statusCode } = await request(app).post('/get-null');
        expect(statusCode).toBe(200)
        expect(body).toEqual({})
    });

});

