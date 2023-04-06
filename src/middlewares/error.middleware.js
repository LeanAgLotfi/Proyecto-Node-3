import { apiErrorResponse } from "../utils/api.utils.js"

const errorMiddleware = (error, req, res, next) => {
  const response = apiErrorResponse(error.description || error.message, error.details || error);
  return res.status(error.status || 500).json(response);
};

export default errorMiddleware