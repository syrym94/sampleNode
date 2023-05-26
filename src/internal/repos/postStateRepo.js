const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { pick } = require("lodash");
const BaseRepo = require("./base");
const { PostState } = require("../entities");

class PostStateRepo extends BaseRepo({ Entity: PostState }) {

  async bulkUpdateById(data) {
    return this.query.transaction((t) => {
      return this.bulkCreate(data, {
        updateOnDuplicate: ["old_status", "status", "order"],
        transaction: t,
      });
    })
  }

  async updateByPostIds(ids, input) {
    const records = await this.query.transaction((t) => {
      return this.gateway.PostState.update(input, {
        where: { post_id: ids },
        returning: true,
        transaction: t,
      });
    })
    return records[1] ? this.map(records[1]) : [];
  }

  async getAllByPostIds(ids = []) {
    const options = {
      where: {
        post_id: ids
      }
    }
    const record = await this.gateway.PostState.findAll(options);
    return this.map(record);
  }

  toJSON (models = []) {
    return models.map(model => pick(model, ["id", "order", "status", "old_status", "post_id"]));
  }
}

module.exports = PostStateRepo;
