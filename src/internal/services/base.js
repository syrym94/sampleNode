const { NotImplementedError } = require("@utils/errors");

const { makeLogger } = require("@utils/logger");

class BaseService {
  constructor(deps = {}, attr = {}) {
    this.deps = deps;
    this.attr = attr;
    if (!this.deps.logger) {
      this.deps.logger = makeLogger({ label: this.constructor.name });
    }
  }

  call() {
    throw new NotImplementedError(`${this.constructor.name}#update`);
  }

  get config() {
    return this.deps.config;
  }

  get logger() {
    return this.deps.logger;
  }
}

module.exports = BaseService;
