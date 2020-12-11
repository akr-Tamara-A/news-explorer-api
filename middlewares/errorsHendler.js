module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.errors && err.errors.email.properties.type === 'unique') {
    statusCode = 409;
    message = err.errors.email.message;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
