const { Schema, model } = require('mongoose');
const isURL = require('validator/lib/isURL');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  title: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  text: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  date: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  source: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator: (value) => isURL(value),
      message: (props) => `${props.value} невалидный!`,
    },
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator: (value) => isURL(value),
      message: (props) => `${props.value} невалидный!`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = model('article', articleSchema);
