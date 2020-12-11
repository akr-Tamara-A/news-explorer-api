const bcrypt = require('bcryptjs');

const isEmail = require('validator/lib/isEmail');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { genereteToken } = require('../utils/genereteToken');

/** Контролер создания нового пользователя */
module.exports.createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    if (!password) {
      throw new BadRequestError('Невалидные данные');
    }
    const hash = await bcrypt.hash(password, 10);

    const newUser = await new User({
      email,
      name,
      password: hash,
    });

    const validateError = newUser.validateSync();

    if (validateError) {
      throw new BadRequestError('Невалидные данные');
    } else {
      await newUser.save();
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    }
  } catch (err) {
    next(err);
  }
};

/** Контролер логина пользователя */
module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!isEmail(email)) {
      throw new UnauthorizedError('Передан не верный логин или пароль');
    } else {
      const user = await User.findUserByCredentials(email, password);
      if (!user) {
        throw new UnauthorizedError('Необходима авторизация');
      } else {
        res.send({ token: genereteToken(user._id) });
      }
    }
  } catch (err) {
    next(err);
  }
};

/** Контролер запроса пользователя */
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Такой пользователь не существует');
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};
