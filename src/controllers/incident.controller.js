import Incident from '../models/incident.model.js';
import appResponse from '../utils/appResponse.js';
import { AppError } from '../utils/appError.js';
import validateIncident from '../validations/incident.validate.js';
import mongoose from 'mongoose';
export const getIncidents = async (req, res, next, Model = Incident) => {
  try {
    const incidents = await Model.find();
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError({ message: 'Invalid Incident ID format', statusCode: 400 });
    }
    const found = await Incident.findById(id);
    if (!found) throw new AppError({ message: 'incident not found', statusCode: 404 });
    appResponse(res, { message: "Incident found", data: found })
  } catch (err) {
    next(err)
  }
};

export const deleteIncident = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError({ message: 'Invalid Incident ID format', statusCode: 400 });
    }
    const deleted = await Incident.findByIdAndDelete({ _id: id });
    if (!deleted) throw new AppError({ message: 'incident not found', statusCode: 404 });
    appResponse(res, { message: "Incident deleted successfuly", data: [deleted] })
  } catch (err) {
    next(err)
  }
}

export const updateIncident = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError({ message: 'Invalid Incident ID format', statusCode: 400 });
    }
    const result = validateIncident(req.body,false)
    if (result.length > 0) {
      throw new AppError({
        message: 'Validation failed',
        statusCode: 400,
        errors: result,
      });
    }
    const updated = await Incident.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) throw new AppError({ message: 'incident not found', statusCode: 404 });
    appResponse(res, { message: "Incident updated successfuly", data: [updated] })
  } catch (err) {
    next(err)
  }
}
