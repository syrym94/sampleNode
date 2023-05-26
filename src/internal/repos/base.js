const db = require("@utils/datastore/sequelize/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { setSearch, setDate } = require("@utils/datastore/helpers");

const BaseRepo = ({ Entity }) => {
  class Base {
    constructor(gateway = db) {
      this.gateway = gateway;
    }

    get query() {
      return this.gateway.sequelize;
    }

    static mapOne(record) {
      return new Entity(record.dataValues);
    }

    static map(payload) {
      if (Array.isArray(payload)) {
        payload = payload.filter((record) => {
          return typeof record !== "number";
        });
        return payload.map((record) => {
          return this.mapOne(record);
        });
      }

      return this.mapOne(payload);
    }

    static demapOne(entity) {
      throw new NotImplementedError(entity);
    }

    static demap(payload) {
      if (Array.isArray(payload)) {
        return payload.map((record) => this.demapOne(record));
      }

      return this.demapOne(payload);
    }

    async getById(id, options) {
      const record = await this.query.models[Entity.name].findByPk(id, options);
      return this.map(record);
    }


    async count(options) {
      return this.query.models[Entity.name].count(options);
    }


    // TODO OLD 
    // async receiveOne(id, options) {
    //   const record = await this.query.models[Entity.name].findByPk(id, options);
    //   return this.map(record);
    // }

    async deleteOne(id) {
      return this.query.models[Entity.name].destroy({
        where: {
          id: id,
        },
      });
    }
    
    async deleteAll(ids = [], options = {}) {
      return this.query.models[Entity.name].destroy({
        where: {
          id: ids,
        },
        ...options
      });
    }

    async receiveAll(search) {
      let options = {};
      if (search) {
        options = setSearch(search);
      } else {
        options = { order: [["createdAt", "DESC"]] };
      }
      const records = await this.query.models[Entity.name].findAll(options);
      return this.map(records);
    }

    async createOne(input, options) {
      const record = await this.query.models[Entity.name].create(input, options);
      return this.map(record);
    }

    async bulkCreate(input = [], options) {
      const record = await this.query.models[Entity.name].bulkCreate(input, options);
      return this.map(record);
    }

    async addOne(postId, input) {
      let res = {};
      res = { ...input, post_id: postId };
      const record = await this.query.models[Entity.name].create(res);
      return this.map(record);
    }

    async bulkUpdate(ids = [], input){
      const records = await this.query.transaction((t) => {
        return this.query.models[Entity.name].update(input, {
          where: { id: ids },
          returning: true,
          transaction: t,
        });
      })
      return records[1] ? this.map(records[1]) : [];
    }

    async updateOne(id, input) {
      const record = await this.query.models[Entity.name].update(input, {
        where: { id },
        returning: true,
      });
      if (record.length > 1) {
        return this.map(record[1]);
      } else {
        return this.map(record);
      }
    }

    async updateMany(postId, input) {
      const records = await this.query.models[Entity.name].update(input, {
        where: { post_id: postId },
        returning: true,
      });
      return this.map(records);
    }

    mapOne(record) {
      return this.constructor.mapOne(record);
    }

    map(payload) {
      return this.constructor.map(payload);
    }


    async transaction (hook) {
      return this.query.transaction(hook);
    }
  }
  return Base;
};

module.exports = BaseRepo;
