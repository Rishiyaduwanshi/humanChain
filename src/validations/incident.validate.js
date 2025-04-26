const validateIncident = (data, isCreate = true) => {
  const errors = [];
  const allowedFields = ['title', 'description', 'severity']; 
  if (!data || Object.keys(data).length === 0) {
    errors.push("Request data cannot be empty");
    return errors;
  }
  
  const { title, description, severity, _id, reported_at } = data;
  if (!isCreate) {
    if (_id || reported_at) {
      errors.push("_id and reported_at cannot be updated");
    }
  }
  const extraFields = Object.keys(data).filter(field => !allowedFields.includes(field));
  if (extraFields.length > 0) {
    errors.push(`Invalid fields: ${extraFields.join(', ')}`);
  }

  if (isCreate && !title) {
    errors.push("title is required");
  } else if (title !== undefined && typeof title !== 'string') {
    errors.push('title must be a string');
  }

  if (isCreate && !description) {
    errors.push("description is required");
  } else if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string');
  }

  if (isCreate && !severity) {
    errors.push("severity is required");
  } else if (severity !== undefined) {
    const validSeverities = ["Low", "Medium", "High"];
    if (!validSeverities.includes(severity)) {
      errors.push("severity must be one of: Low, Medium, High");
    }
  }

  return errors;
};
export default validateIncident;