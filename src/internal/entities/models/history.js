const BaseEntity = require("../base");
const { entitySchema } = require("../common");

const historySchema = entitySchema((schema) =>
  schema.object({
    message: schema.string().max(1000).required(),
    post_id: schema.number().integer().required(),
  })
);

class History extends BaseEntity(historySchema) {}

module.exports = History;
