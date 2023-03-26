const { celebrate, Joi } = require('celebrate');
const { urlRegEx } = require('../utils/constants');

const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlRegEx).required(),
    trailerLink: Joi.string().required(),
    thumbnail: Joi.string().regex(urlRegEx).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const idValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().hex().length(24),
  }),
});

const userSignUpValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }).unknown(true),
});

const userSignInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  movieValidator, idValidator, userSignUpValidator, userDataValidator, userSignInValidator,
};
