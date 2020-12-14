const router = require('express').Router();

const { getUser } = require('../controllers/users');

const { idValidation } = require('../middlewares/validation');

/** Обработка запроса отдельного пользователя */
router.get('/users/me', idValidation, getUser);

module.exports = router;
