const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const ErrorForbidden = require('../errors/ErrorForbidden');

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
    if (_id == null) {
      throw new NotFoundError('Фильм не найден');
    }
    if (String(movie.owner) === req.user._id) {
      await movie.remove();
      return res.status(200).json({ message: 'Фильм удален' });
    }
    throw new ErrorForbidden('Нет прав для удаления фильма');
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequest('Передан некорректный запрос'));
    }
    return next(e);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const { ...data } = req.body;
    const movie = await Movie.create({
      ...data, owner: req.user._id,
    });
    const result = await Movie.findById(movie._id).populate('owner');
    return res.status(201).json(result);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequest('переданы некорректные данные в методы добавления фильма'));
    }
    return next(e);
  }
};

module.exports = {
  getMovies, addMovie, deleteMovie,
};
