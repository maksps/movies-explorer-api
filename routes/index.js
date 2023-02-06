const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  createUser, login,
} = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }).unknown(true),
}), createUser);
router.use(auth);
router.use('/movies', movies);
router.use('/users', users);

router.use('*', (req, res, next) => next(new NotFoundError('Неверный URL')));

module.exports = router;