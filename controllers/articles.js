const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

/** Контролер запроса всех карточек */
module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id }).populate('user');
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
      res.send({
        keyword: newArticle.keyword,
        title: newArticle.title,
        text: newArticle.text,
        date: newArticle.date,
        source: newArticle.source,
        image: newArticle.image,
        link: newArticle.link,
        _id: newArticle._id,
      });
    }
  } catch (err) {
    next(err);
  }
};

/** Контролер удаления карточки */
module.exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).select('+owner').populate('user');
    if (!article) {
      throw new NotFoundError('Такая карточка не существует');
    } else {
      const user = req.user._id;

      const articleOwner = JSON.stringify(article.owner).slice(1, -1);
      // if (article.owner.equals(req.user._id)) {
      if (user !== articleOwner) {
        throw new ForbiddenError('Это чужая карточка');
      } else {
        const articleForDel = await article.remove();
        res.send({
          keyword: articleForDel.keyword,
          title: articleForDel.title,
          text: articleForDel.text,
          date: articleForDel.date,
          source: articleForDel.source,
          image: articleForDel.image,
          link: articleForDel.link,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
