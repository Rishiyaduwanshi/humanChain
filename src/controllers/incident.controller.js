import Incident from '../models/incident.model.js';
import appResponse from '../utils/appResponse.js';
import { AppError } from '../utils/appError.js';
import validateIncident from '../validations/incident.validate.js';
export const getIncidents = async (req, res, next) => {
  try {
    const incidents = await Incident.find();
    appResponse(res, {
      data: incidents,
      message: 'Incidents fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const createIncident = async (req, res, next) => {
  try {
    const data = req.body;
    const result = validateIncident(data);
    console.log(result);
    console.log(result.length);
    if (result.length > 0) {
      throw new AppError({
        message: 'Validation failed',
        statusCode: 400,
        errors: result,
      });
    }
    const newIncident = new Incident(data);
    await newIncident.save();
    appResponse(res, {
      data: newIncident,
      message: 'Incident created successfully',
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const getIncidentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const found = await Incident.find({ _id: id });
    console.log(found);
    if (!found) throw new AppError({ message: 'incident not found', statusCode:404 });
    appResponse(res, {message : "Incident found", data : found})
  } catch (err) {
    next(err)
  }
};

