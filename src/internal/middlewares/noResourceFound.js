const { NotFoundError } = require("@utils/errors");

const MESSAGE = "No Resource Found";

module.exports = function noResourceFoundMiddleware(_req, _res, next) {
  next(new NotFoundError(MESSAGE));
};
