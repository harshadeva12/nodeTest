const app = require('./server.js')
const supertest = require('supertest')
const request = supertest(app)

describe('Test /ping', () => {
  it('should return Pong!', async () => {
    request.get('/ping').then((response) => {
      expect(response.text).toBe('Pong!')
    })
  });
});