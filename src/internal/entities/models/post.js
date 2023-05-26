const BaseEntity = require("../base");
const { entitySchema } = require("../common");

const postSchema = entitySchema((schema) =>
  schema.object({
    message: schema.string().max(1000).required(),
    channelId: schema.string().max(255).required(),
    channelTitle: schema.string().max(255).required(),
    author: schema.string().max(255),
    time: schema.date().optional().allow(null, ""),
  })
);

class Post extends BaseEntity(postSchema) {}

module.exports = Post;
