const { getKeysOfSchema } = require("@utils/schema");
const { UnprocessableEntityError } = require("@utils/errors");

const BaseEntity = (schema) => {
  return class Base {
    constructor(attr = {}) {
      const validation = this.constructor.schema.validate(attr);
      this.attr = validation.value;
      this.error = validation.error || null;

      this.constructor.getters.forEach((key) => {
        Object.defineProperty(this, key, {
          get() {
            return this.attr[key];
          },
        });
      });
    }

    static get schema() {
      return schema;
    }

    static get getters() {
      return getKeysOfSchema(this.schema);
    }

    isValid() {
      const validation = this.constructor.schema.validate(this.attr);
      if (!validation.error) return true;

      this.error = validation.error;
      return false;
    }

    validate() {
      const validation = this.constructor.schema.validate(this.attr);
      if (!validation.error) return null;

      throw new UnprocessableEntityError(
        this.constructor.name,
        validation.error
      );
    }

    toString() {
      const { id, ...rest } = this.attr;
      return `${this.constructor.name}(${id}) ${JSON.stringify(rest)}`;
    }

    clone(attr) {
      return new this.constructor({ ...this.attr, ...attr });
    }

    toJSON() {
      return this.attr;
    }
  };
};

module.exports = BaseEntity;
