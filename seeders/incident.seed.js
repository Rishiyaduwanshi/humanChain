// seeders/incident.seed.js
import Incident from '../src/models/incident.model.js';
import { incidentData } from '../data/incident.seed.js';
import _ from '../config/connectDb.js';
const seedIncidents = async () => {
  try {
    await Incident.insertMany(incidentData);
    console.log('Incidents seeded successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  }finally{
    process.exit();
  }
};

seedIncidents();
