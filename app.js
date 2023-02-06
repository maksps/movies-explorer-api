const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
// const users = require('./routes/users');
// const movies = require('./routes/movies');
// const NotFoundError = require('./errors/NotFoundError');
// const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const {
//   createUser, login,
// } = require('./controllers/users');
const router = require('./routes/index');

const PORT = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
});

app.use(express.json());

app.use(cors());
app.use(requestLogger);
// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// }), login);

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//     name: Joi.string().min(2).max(30),
//   }).unknown(true),
// }), createUser);
// app.use(auth);
// app.use('/movies', movies);
// app.use('/users', users);

// app.use('*', (req, res, next) => next(new NotFoundError('Неверный URL')));
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка!'
        : message,
    });
  next();
});
