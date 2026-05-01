const request = require('supertest');
const app = require('../src/app');

describe('App API', () => {

  describe('GET /', () => {
    it('should return app info', async () => {
      const res = await request(app).get('/');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('DevOps');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('UP');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /sum', () => {

    it('should return sum for valid input', async () => {
      const res = await request(app)
        .post('/sum')
        .send({ a: 5, b: 7 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.result).toBe(12);
    });

    it('should fail for invalid input type', async () => {
      const res = await request(app)
        .post('/sum')
        .send({ a: "5", b: 7 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail when inputs are missing', async () => {
      const res = await request(app)
        .post('/sum')
        .send({ a: 5 });

      expect(res.statusCode).toBe(400);
    });

  });

});
