const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { NODE_ENV, DB_URL } = process.env;

const errorHandler = require('./middlewares/errorHendler');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { dbUrlDev } = require('./utils/devConfig');

const PORT = 3000;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : dbUrlDev, {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
});

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
