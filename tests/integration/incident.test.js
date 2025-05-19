import request from 'supertest';
import app from '../../server.js';
import Incident from '../../src/models/incident.model.js';

describe('Incident API Integration Tests', () => {
  afterEach(async () => {
    await Incident.deleteMany();
  });

  describe('POST /api/v1/incidents', () => {
    it('should create a new incident', async () => {
      const response = await request(app)
        .post('/api/v1/incidents')
        .send({
          title: 'Test Incident',
          description: 'Test Description',
          severity: 'High'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Test Incident');
    });

    it('should return validation error for invalid data', async () => {
      const response = await request(app)
        .post('/api/v1/incidents')
        .send({
          title: 'Test Incident',
          severity: 'Invalid'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/incidents', () => {
    it('should return all incidents', async () => {
      await Incident.create({
        title: 'Test Incident',
        description: 'Test Description',
        severity: 'High'
      });

      const response = await request(app).get('/api/v1/incidents');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(1);
    });
  });
});