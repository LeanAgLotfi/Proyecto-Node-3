import { SESSION_KEY } from '../constants/sessionsKey.js'

export const sessionMiddleware = async (req, res, next) => {
  const cookies = req.cookies
  if (Object.keys(cookies).includes(SESSION_KEY)) {
    res.redirect('/products');
  } else {
    next();
  }
};

