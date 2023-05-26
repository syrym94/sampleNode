const morgan = require("morgan");

const makeLoggingMiddleware = ({ makeLogger, makeStream }) => {
  const logger = makeLogger({ label: "REQUEST_END" });
  const stream = makeStream(logger);
  return [morgan("dev", { stream })];
};

module.exports = makeLoggingMiddleware;
