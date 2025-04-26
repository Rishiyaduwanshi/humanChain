import { Router } from "express";
import {createIncident, deleteIncident, getIncidentById, getIncidents,} from "../controllers/incident.controller.js";
 
const router = Router();

router.route('/incidents')
.get(getIncidents)
.post(createIncident)

router.route('/incidents/:id')
.get(getIncidentById)
.delete(deleteIncident)

export default router;