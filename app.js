require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorsHendler = require('./middlewares/errorsHendler');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/newsdb' } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/** подключаемся к серверу mongo */
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/** Обработка запросов */
app.use(requestLogger);
app.use(routes);

/** Обработка ошибок */
app.use(errorLogger);
app.use(errors());
app.use(errorsHendler);

/** Слушатель порта */
app.listen(PORT);
