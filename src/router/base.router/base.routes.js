import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { HTTP_STATUS } from "../../constants/api.constants.js";
import  passportCall  from "../../config/passport.cofing.js";
import { apiErrorResponse } from "../../utils/api.utils.js";
import ENV_CONFIG from "../../config/enviroment.config.js";

export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }
 
  applyCallbacks(callbacks) {
    return callbacks.map(callback => async (...params) => {
      try {
        await callback.apply(this, params);
      }
      catch(error) {
        params[2](error);
      }
    });
  }

  handleAuthRoles(roles) {
    return async (req, res, next) => {
      if (roles[0] === "PUBLIC") {
        return next();
      }

      const token = req.cookies[ENV_CONFIG.SESSION_KEY];
      if(!token) {
        const response = apiErrorResponse("Unauthorized");
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
      }

      const user = jwt.verify(token, ENV_CONFIG.SECRET_KEY);
      if (!roles.includes(`${user.role}`.toUpperCase())) {
        const response = apiErrorResponse("Access Denied");
        return res.status(HTTP_STATUS.FORBIDDEN).json(response);
      }
      next();
    };
  }

  get(path, roles, ...callbacks) {
    this.router.get(
      path,
      this.handleAuthRoles(roles),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, roles, ...callbacks) {
    this.router.post(
      path,
      this.handleAuthRoles(roles),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, roles, ...callbacks) {
    this.router.put(
      path,
      this.handleAuthRoles(roles),
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, roles, ...callbacks) {
    this.router.delete(
      path,
      this.handleAuthRoles(roles),
      this.applyCallbacks(callbacks),
    );
  }
}