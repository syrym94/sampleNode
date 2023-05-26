const { schema } = require("@utils/schema");

const entitySchema = (makeSchema) =>
  makeSchema(schema).append({
    id: schema.number(),
    createdAt: schema.date().optional().allow(null),
    updatedAt: schema.date().optional().allow(null),
  });

const extendEntitySchema = (Entity, extend) =>
  Entity.schema.append(extend(schema));

module.exports = {
  entitySchema,
  extendEntitySchema,
};
