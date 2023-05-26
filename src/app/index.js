const express = require("express");
const { config } = require("@config");
const configureRoutes = require("@config/routes");
const controllers = require("@controllers");
const middlewares = require("@middlewares");
const { makeLogger } = require("@utils/logger");
const Application = require("./application");

const app = express();
const router = new express.Router();
app.use("/api", router);

configureRoutes(router, { controllers, middlewares });

module.exports = new Application(app, config, makeLogger({ label: "APP" }));
