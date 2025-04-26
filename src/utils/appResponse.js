export default function appResponse(res,{ 
  statusCode = 200, 
  message = 'Success',
  success = true,
  data = [], 
  errors = [] 
}){
  res.status(statusCode).json({
    message,
    statusCode,
    success,
    data: data ?? [],
    errors: errors,
  });
}
