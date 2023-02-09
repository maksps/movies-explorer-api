const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
// const users = require('./routes/users');
// const movies = require('./routes/movies');
// const NotFoundError = require('./errors/NotFoundError');
// const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHendler');
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
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
