// models/Incident.js
import mongoose from 'mongoose';
const IncidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  reported_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Incident', IncidentSchema);
