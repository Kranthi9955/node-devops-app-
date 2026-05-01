const request = require('supertest');
const app = require('../src/app');

describe('App API', () => {
  test('GET /', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('DevOps Practice App Running 🚀');
  });

  test('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('UP');
  });

  test('POST /sum valid', async () => {
    const res = await request(app)
      .post('/sum')
      .send({ a: 5, b: 7 });

    expect(res.body.result).toBe(12);
  });

  test('POST /sum invalid', async () => {
    const res = await request(app)
      .post('/sum')
      .send({ a: "5", b: 7 });

    expect(res.statusCode).toBe(400);
  });
});