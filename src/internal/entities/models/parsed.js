const BaseEntity = require("../base");
const { entitySchema } = require("../common");

// TODO
const parsedSchema = entitySchema((schema) =>
  schema.object({
    position: schema.string().max(255).allow("", null),
    roles: schema.array().items(schema.string().allow("", null)),
    rates: schema.string().max(255).allow("", null),
    technologies: schema.array().items(schema.string().allow("", null)),
    contact: schema.array().items(schema.string().allow("", null)),
    location: schema.array().items(schema.string().allow("", null)),
    language: schema.string().max(255).allow("", null),
    level: schema.array().items(schema.string().allow("", null)),
    post_id: schema.number().integer().required(),
  })
);

class Parsed extends BaseEntity(parsedSchema) {}

module.exports = Parsed;
