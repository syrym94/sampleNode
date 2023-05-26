require("dotenv").config();

const Joi = require("joi");
const rootPath = require("app-root-path");
const deepFreeze = require("../utils/deepFreeze");
const { ConfigurationError } = require("../utils/errors");

const schema = Joi.object({
  rootPath: Joi.string().required(),
  server: Joi.object({
    port: Joi.number().default(3000),
  }).required(),
  postgres: Joi.object({
    host: Joi.string().required(),
    database: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
  NODE_ENV: Joi.string().default("development"),
  DOMAIN: Joi.string().required(),
  users: Joi.object({
    passwordSaltLenght: Joi.number().required(),
  }),
  session: Joi.object({
    key: Joi.string().required(),
    liveTime: Joi.number()
      .positive()
      .default(1 * 365 * 24 * 60 * 60),
    shortLiveTime: Joi.number()
      .positive()
      .default(2 * 60 * 60),
    clientLiveTime: Joi.number()
      .positive()
      .default(4 * 60 * 60),
    tokenType: Joi.string().default("Bearer"),
  }),
}).required();

const makeConfiguration = () => {
  const config = {
    rootPath: `${rootPath}`,
    server: {
      port: process.env.PORT,
    },
    postgres: {
      host: process.env.POSTGRES_HOST,
      database: `${process.env.POSTGRES_DB}_${process.env.NODE_ENV}`,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    NODE_ENV: process.env.NODE_ENV,
    session: {
      key: process.env.DASHBOARD_API_KEY,
    },
    DOMAIN: process.env.DOMAIN,
    users: {
      passwordSaltLenght: 10,
    },
  };
  const { value, error } = schema.validate(config);
  if (error) throw new ConfigurationError(error);

  return deepFreeze(value);
};

module.exports = makeConfiguration;
