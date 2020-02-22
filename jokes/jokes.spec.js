const request = require('supertest');
const server = require('../api/server.js');

describe('GET /jokes', () => {
    it('should retrieve jokes', async () => {
        await request(server)
        .post('/api/auth/register')
        .send({username: "cquinn", password: "password"})
        .set('Accept', 'application/json');

        let token;

        await request(server)
            .post('/api/auth/login')
            .send({username: "cquinn", password: "password"})
            .set('Accept', 'application/json')
            .then(response => {
                token = response.body.token;
            })

        let res = await request(server)
            .get('/api/jokes')
            .set('Accept', 'application/json')
            .set('authorization', token);
        expect(res.status).toBe(200);
    })
})