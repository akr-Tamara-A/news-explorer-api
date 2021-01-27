const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.empty': 'Поле "email" не должно быть пустым',
        'string.email': 'Поле "email" должно быть валидным email-адресом',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': 'Поле "password" должно быть заполнено',
        'string.empty': 'Поле "password" не должно быть пустым',
        'string.min': 'Минимальная длина поля "password" - 8 символов',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
      }),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
      .messages({
        'string.empty': 'Поле "_id" не должно быть пустым',
        'string.alphanum': 'Поле "_id" содержит не буквенно-цифровые символы',
        'string.length': 'Обязательная длина поля "_id" - 24 символа',
        'string.hex': 'Поле "_id" должно быть валидной шестнадцатеричной строкой',
      }),
  }),
});

const articleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': 'Поле "keyword" должно быть заполнено',
        'string.empty': 'Поле "keyword" не должно быть пустым',
      }),
    title: Joi.string().required()
      .messages({
        'any.required': 'Поле "title" должно быть заполнено',
        'string.empty': 'Поле "title" не должно быть пустым',
      }),
    text: Joi.string().required()
      .messages({
        'any.required': 'Поле "text" должно быть заполнено',
        'string.empty': 'Поле "text" не должно быть пустым',
      }),
    date: Joi.string().required()
      .messages({
        'any.required': 'Поле "date" должно быть заполнено',
        'string.empty': 'Поле "date" не должно быть пустым',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'Поле "source" должно быть заполнено',
        'string.empty': 'Поле "source" не должно быть пустым',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value)) {
        return helpers.message('Поле "image" должно быть валидным url-адресом');
      }
      return value;
    })
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
        'string.empty': 'Поле "image" не должно быть пустым',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value)) {
        return helpers.message('Поле "link" должно быть валидным url-адресом');
      }
      return value;
    })
      .messages({
        'any.required': 'Поле "link" должно быть заполнено',
        'string.empty': 'Поле "link" не должно быть пустым',
      }),
  }),
});

const articleIdValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).hex()
      .messages({
        'string.empty': 'Поле "articleId" не должно быть пустым',
        'string.alphanum': 'Поле "articleId" содержит не буквенно-цифровые символы',
        'string.length': 'Обязательная длина поля "articleId" - 24 символа',
        'string.hex': 'Поле "articleId" должно быть валидной шестнадцатеричной строкой',
      }),
  }),
});

module.exports = {
  idValidation,
  articleIdValidation,
  userValidation,
  articleValidation,
};
