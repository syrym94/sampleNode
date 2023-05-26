const BaseEntity = require("../base");
const { entitySchema } = require("../common");

const postStateSchema = entitySchema((schema) =>
  schema.object({
    order: schema.number().integer(),
    status: schema.string().max(255).required(),
    old_status: schema.string().max(255).allow(null, ""),
    post_id: schema.number().integer().required(),
  })
);

class PostState extends BaseEntity(postStateSchema) {}

module.exports = PostState;
