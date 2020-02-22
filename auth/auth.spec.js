const request = require('supertest');
const db = require("../database/dbConfig.js");
const server = require('../api/server.js');

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})

describe('POST /register', () => {
    it('should register the user', async () => {
        let res = await request(server)
            .post('/api/auth/register')
            .send({username: "cquinn1", password: "password"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(201);
    })

    it('should return 500 if username or password are missing', async () => {
        let res = await request(server)
            .post('/api/auth/register')
            .send({username: "cquinn1"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(500);
    })
});

describe('POST /login', () => {
    it('should log the user in', async () => {
        let res = await request(server)
            .post('/api/auth/login')
            .send({username: "cquinn", password: "password"})
            .set('Accept', 'application/json')
        expect(res.status).toBe(200);
    })
    
    it('should return status 500 if username or password missing', async () => {
        let res = await request(server)
            .post('/api/auth/login')
            .send({password: "password"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(500);
    })

    it('should return status 401 if password incorrect', async () => {
        let res = await request(server)
            .post('/api/auth/login')
            .send({username: "cquinn", password: "fakepassword"})
            .set('Accept', 'application/json');
        expect(res.status).toBe(401);
    })
})

beforeEach(async () => {
    await db('users').truncate();
    await request(server)
            .post('/api/auth/register')
            .send({username: "cquinn", password: "password"})
            .set('Accept', 'application/json');
})