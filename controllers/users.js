require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const Unauthorized = require('../errors/Unauthorized');
const { errorMessages } = require('../utils/constants');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      throw new Unauthorized(errorMessages.wrongData);
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Unauthorized(errorMessages.wrongData);
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    return res.status(200).json({ token, user });
  } catch (e) {
    return next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
      name,
    });
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    return res.status(201).json({
      token, user,
    });
  } catch (e) {
    if (e.code === 11000) {
      return next(new ConflictError(errorMessages.conflictError));
    }
    if (e.name === 'ValidationError') {
      return next(new BadRequest(errorMessages.badRequestUser));
    }
    return next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user === null) {
      throw new NotFoundError(errorMessages.notFoundUser);
    }
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      body,
      { new: true, runValidators: true },
    );
    if (user === null) {
      throw new NotFoundError(errorMessages.notFoundUser);
    }

    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequest(errorMessages.badRequestUser));
    }
    return next(e);
  }
};

module.exports = {
  getUser, updateUser, login, createUser,
};
