const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const ErrorForbidden = require('../errors/ErrorForbidden');
const { errorMessages } = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user }).populate('owner');
    return res.status(200).json(movies);
  } catch (e) {
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const movie = await Movie.findById(_id);
    if (movie == null) {
      throw new NotFoundError(errorMessages.notFoundMovie);
    }
    if (String(movie.owner) === req.user._id) {
      await movie.remove();
      return res.status(200).json({ message: 'Фильм удален' });
    }
    throw new ErrorForbidden(errorMessages.forbiddenDelete);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequest(errorMessages.badRequest));
    }
    return next(e);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const { ...data } = req.body;

    if (await Movie.findOne({ movieId: data.movieId, owner: req.user._id}, { movieId: data.movieId })) {
      return res.status(200).json({ message: 'Такой фильм в базе пользователя уже есть' });
    }

    const movie = await Movie.create({
      ...data, owner: req.user._id,
    });
    const result = await Movie.findById(movie._id).populate('owner');
    return res.status(201).json(result);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequest(errorMessages.badRequestMovie));
    }
    return next(e);
  }
};

module.exports = {
  getMovies, addMovie, deleteMovie,
};
