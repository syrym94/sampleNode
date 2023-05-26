const BaseEntity = require("../base");
const { entitySchema } = require("../common");

const postDetailsSchema = entitySchema((schema) =>
  schema.object({
    type: schema.string().max(255).allow("", null),
    contact_email: schema.array().items(schema.string().allow("")).allow(null),
    post_id: schema.number().integer().required(),
  })
);

class PostDetails extends BaseEntity(postDetailsSchema) {}

module.exports = PostDetails;
