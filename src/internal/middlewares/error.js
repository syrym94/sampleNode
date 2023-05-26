const {
  ConflictError,
  InternalError,
  BaseError,
  UnprocessableEntityError,
} = require("@utils/errors");

const errorMappers = [
  {
    isMatched: (error) =>
      error.detail && error.detail.includes("already exists"),
    map: () => new ConflictError("Entity Already Exist"),
  },
  {
    isMatched: (error) => error instanceof BaseError,
    map: (error) => error,
  },
  {
    isMatched: (error) => error.code && error.code.includes("22"),
    map: () => new UnprocessableEntityError("Invalid input"),
  },
  {
    isMatched: () => true,
    map: (error) =>
      new InternalError(
        error.message,
        error.details || error.detail,
        error.statusCode
      ),
  },
];

const mapError = (error) => {
  const { map } = errorMappers.find((mapper) => mapper.isMatched(error));
  return map(error);
};

/* eslint-disable no-unused-vars */
module.exports = ({ makeLogger }) => {
  const logger = makeLogger({ label: "ERROR_MIDDLEWARE" });
  return function errorMiddleware(error, _req, res, _next) {
    logger.error(error);
    const { statusCode, message, details } = mapError(error);
    res.status(statusCode).json({
      statusCode,
      message,
      details,
    });
  };
};
