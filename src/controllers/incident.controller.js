import  Incident  from "../models/incident.model.js";
import appResponse from "../utils/appResponse.js";
export const getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find();
        appResponse(res, {
            data: incidents,
            message: "Incidents fetched successfully",
        })
    } catch (error) {
        next(error);
    }
};

export const createIncident = async (req, res) => {

}