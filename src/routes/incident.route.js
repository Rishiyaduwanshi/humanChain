import { Router } from "express";
import {createIncident, getIncidents,} from "../controllers/incident.controller.js";
 
const router = Router();

router.route('/incidents')
.get(getIncidents)
.post(createIncident)

export default router;