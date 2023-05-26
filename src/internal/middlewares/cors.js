const cors = require("cors");
const http = require("http");

const makeCorsMiddleware = (config) =>
  cors({
    origin: new RegExp(config.domain),
    methods: http.METHODS,
    allowedHeaders: ["Content-Type", "Accept"],
    exposedHeaders: ["Content-Disposition"],
    optionsSuccessStatus: 200,
    credentials: true,
  });

module.exports = makeCorsMiddleware;
