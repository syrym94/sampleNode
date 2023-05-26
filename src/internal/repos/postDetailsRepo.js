const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { pick } = require("lodash");
const BaseRepo = require("./base");
const { PostDetails } = require("../entities");

class postDetailsRepo extends BaseRepo({ Entity: PostDetails }) {

  async updateByPostId(id, input, transaction = null) {
    const update = (t) => this.gateway.PostDetails.update(input, {
      where: { post_id: id },
      returning: true,
      transaction: t,
    });
    const records = transaction ? await update(transaction) : await this.query.transaction((t) =>  update(t))
    return records[1] ? this.map(records[1][0]) : [];
  }
}

module.exports = postDetailsRepo;
