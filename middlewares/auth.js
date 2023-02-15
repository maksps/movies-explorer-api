const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const { devJWT } = require('../utils/devConfig');
const { errorMessages } = require('../utils/constants');

const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized(errorMessages.unauthorized));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devJWT);
  } catch (err) {
    return next(new Unauthorized(errorMessages.unauthorized));
  }

  req.user = payload;
  return next();
};
