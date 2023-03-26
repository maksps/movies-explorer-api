const router = require('express').Router();
const { userSignInValidator, userSignUpValidator } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const {
  createUser, login,
} = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', userSignInValidator, login);

router.post('/signup', userSignUpValidator, createUser);
router.use(auth);
router.use('/movies', movies);
router.use('/users', users);

router.use('*', (req, res, next) => next(new NotFoundError('Неверный URL')));

module.exports = router;
