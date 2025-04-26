const validateIncident = (data) => {
  const errors = [];
  const {title, description, severity} = data;

  if (!data) {
    errors.push("Request data cannot be empty");
    return errors;
  }

  if (!title) errors.push("title is required");
  if(typeof title === 'number') errors.push('title cannot be number')
    if (!description) errors.push("description is required");
  if(typeof description === 'number') errors.push('title cannot be number')
  if (!severity) {
    errors.push("severity is required")
  } else {
    const validSeverities = ["Low", "Medium", "High"];
    if (!validSeverities.includes(severity)) {
      errors.push("severity must be one of: Low, Medium, High")
    }
  }
  console.log(errors)
  return errors;
};

export default validateIncident;
