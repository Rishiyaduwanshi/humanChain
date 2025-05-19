import mongoose from 'mongoose';
import Incident from '../../../src/models/incident.model.js';

describe('Incident Model Test', () => {
  afterEach(async () => {
    await Incident.deleteMany();
  });

  it('should create & save incident successfully', async () => {
    const validIncident = {
      title: 'Test Incident',
      description: 'Test Description',
      severity: 'High'
    };
    const savedIncident = await new Incident(validIncident).save();
    
    expect(savedIncident._id).toBeDefined();
    expect(savedIncident.title).toBe(validIncident.title);
    expect(savedIncident.description).toBe(validIncident.description);
    expect(savedIncident.severity).toBe(validIncident.severity);
    expect(savedIncident.reported_at).toBeDefined();
  });

  it('should fail to save with invalid severity', async () => {
    const incidentWithInvalidSeverity = {
      title: 'Test Incident',
      description: 'Test Description',
      severity: 'Invalid'
    };

    let err;
    try {
      await new Incident(incidentWithInvalidSeverity).save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});