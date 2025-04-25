import { Router } from "express";
import {getIncidents,} from "../controllers/incident.controller.js";
 
const router = Router();

router.get("/incidents", getIncidents);

export default router;