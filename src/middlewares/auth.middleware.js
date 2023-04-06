import { SESSION_KEY } from '../constants/sessionsKey.js'

export const authMiddleware = async (req, res, next) => {
  const cookies = req.cookies
  if (Object.keys(cookies).includes(SESSION_KEY)) {
    next();
  } else {
    res.redirect('/');
  }
};