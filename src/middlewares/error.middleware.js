import { HTTP_STATUS } from "../constants/api.constants.js";
import { apiErrorResponse } from "../utils/api.utils.js";

const errorMiddleware = (error, req, res, next) => {
  const response = apiErrorResponse(error.description || error.message, error.details || error);
  return res.status(error.status || HTTP_STATUS.SERVER_ERROR).json(response);
};

export default errorMiddleware;