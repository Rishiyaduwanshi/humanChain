import { jest } from '@jest/globals';
import {
  getIncidents,
  createIncident
} from '../../../src/controllers/incident.controller.js';

const mockIncident = {
  find: jest.fn().mockResolvedValue([{
    title: 'Test Incident',
    description: 'Test Description',
    severity: 'High'
  }])
};

jest.mock('../../../src/models/incident.model.js', () => ({
  default: function() {
    return mockIncident;
  }
}));

describe('Incident Controller Tests', () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('getIncidents', () => {
    it('should fetch all incidents successfully', async () => {
      await getIncidents(mockRequest, mockResponse, mockNext, mockIncident);
      
      expect(mockIncident.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: 200,
        message: 'Incidents fetched successfully',
        success: true,
        data: [{
          title: 'Test Incident',
          description: 'Test Description',
          severity: 'High'
        }],
        errors: []
      });
    });
  });
});
