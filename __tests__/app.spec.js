const supertest = require('supertest')
const app = require('../server')

describe('GET /api/users', () => {
    it ('must return all the registered users', async (done) => {
        //expect.assertions(1)
        const response = await request(app).get('/api/users')
        expect(response.status).toBe(200)
    })
})