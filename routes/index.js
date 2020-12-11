const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const usersRouter = require('./users');
const articlesRouter = require('./articles');

// const auth = require('../middlewares/auth');
const { userValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

/** Обработка регистрации пользователя */
router.post('/signup', userValidation, createUser);

/** Обработка логина пользователя */
router.post('/signin', userValidation, loginUser);

/** Мидлвэр для авторизации пользователя */
router.use(auth);

/** Обработка запросов пользователя */
router.use('/', usersRouter);

/** Обработка запросов карточек */
router.use('/', articlesRouter);

/** Обработка неправильного запроса */
router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
