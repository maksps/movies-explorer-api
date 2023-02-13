const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, addMovie, deleteMovie,
} = require('../controllers/movies');
const urlRegEx = require('../utils/constants');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlRegEx).required(),
    trailerLink: Joi.string().regex(urlRegEx).required(),
    thumbnail: Joi.string().regex(urlRegEx).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
