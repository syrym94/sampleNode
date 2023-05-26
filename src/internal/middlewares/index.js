const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { config } = require("@config");
const { makeLogger, makeStream } = require("@utils/logger");

const noResourceFoundMiddleware = require("./noResourceFound");
const makeErrorMiddleware = require("./error");
const makeLoggingMiddleware = require("./logging");
const makeCorsMiddleware = require("./cors");

module.exports = {
  cors: makeCorsMiddleware({ domain: config.DOMAIN }),
  noResourceFound: noResourceFoundMiddleware,
  errorHandling: makeErrorMiddleware({ makeLogger }),
  bodyParsing: [
    bodyParser.urlencoded({ limit: "50mb", extended: true }),
    bodyParser.json({ limit: "50mb" }),
  ],
  cookieParsing: cookieParser(),
  logging: makeLoggingMiddleware({ makeLogger, makeStream }, config),
};
