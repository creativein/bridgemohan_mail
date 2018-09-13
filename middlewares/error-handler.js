exports.badRequest = (req, res, next) => {
  const error = new Error('Bad Request');
  error.status = 404;
  next(error);
};

exports.anyError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    error: err.message
  });
};
