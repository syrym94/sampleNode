const BaseRepo = require("./base");
const { Parsed } = require("../entities");
const { setDate, setPositionParsed } = require("@utils/datastore/helpers");

class ParsedRepo extends BaseRepo({ Entity: Parsed }) {
  static demapOne(entity) {
    return {
      position: entity.position,
      roles: entity.roles,
      rates: entity.rates,
      technologies: entity.technologies,
      contact: entity.contact,
      location: entity.location,
      language: entity.language,
      level: entity.level,
    };
  }

  async getParseds() {
    return this.receiveAll();
  }

  async getParsed(id) {
    return this.getById(id);
  }

  async createParsed(input) {
    return this.createOne(input);
  }

  async getBasedOnDate(date) {
    const options = setDate(date, "createdAt", {});
    options.order = [["createdAt", "ASC"]];
    return this.gateway.Parsed.findAll(options);
  }

  async updateParsedForm(id, input) {
    return this.updateOne(id, input);
  }

  async updateCommonParseds(postId, input) {
    return this.updateMany(postId, input);
  }

  async addParsed(postId, input) {
    return this.addOne(postId, input);
  }

  async bulkCreateByPostId(postId, data = [], transaction) {
    const input = data.map(d => ({...d, post_id: postId }))
    const options = { transaction }
    return this.bulkCreate(input, options)
  }

  async deleteAllByPostId(postId, transaction) {
    const options = {
      where: {
        post_id: postId
      },
      force: true,
      transaction,
    }
    return this.deleteAll(null, options)
  }
}

module.exports = ParsedRepo;
