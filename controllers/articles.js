const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

/** Контролер запроса всех карточек */
module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({}).populate('user');
    res.send(articles);
  } catch (err) {
    next(err);
  }
};

/** Контролер создания новой карточки */
module.exports.createArticle = async (req, res, next) => {
  try {
    const newArticle = new Article({ ...req.body, owner: req.user._id });

    const error = newArticle.validateSync();
    if (error) {
      throw new BadRequestError('Невалидные данные');
    } else {
      await newArticle.save();
      res.send(newArticle);
    }
  } catch (err) {
    next(err);
  }
};

/** Контролер удаления карточки */
module.exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).populate('user');
    if (!article) {
      throw new NotFoundError('Такая карточка не существует');
    } else {
      const user = req.user._id;

      const articleOwner = JSON.stringify(article.owner).slice(1, -1);

      if (user !== articleOwner) {
        throw new ForbiddenError('Это чужая карточка');
      } else {
        const articleForDel = await Article.findByIdAndRemove({
          _id: req.params.articleId,
        });
        res.send(articleForDel);
      }
    }
  } catch (err) {
    next(err);
  }
};
