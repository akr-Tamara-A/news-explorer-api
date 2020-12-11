const router = require('express').Router();

const {
  getArticles,
  deleteArticle,
  createArticle,
} = require('../controllers/articles');

const {
  articleValidation,
  articleIdValidation,
} = require('../middlewares/validation');

/** Обработка запроса всех карточек */
router.get('/articles', getArticles);

/** Создание карточки */
router.post('/articles', articleValidation, createArticle);

/** Обработка удаления отдельной карточки */
router.delete('/articles/:articleId', articleIdValidation, deleteArticle);

module.exports = router;
