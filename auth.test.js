const app = require('./server.js')
const supertest = require('supertest')
const request = supertest(app)

describe('Test /Login', () => {
  it('should return 200!', async () => {
    request.post('/login').then((response) => {
      expect(response.text).toBe('Pong!')
    })
  });
});