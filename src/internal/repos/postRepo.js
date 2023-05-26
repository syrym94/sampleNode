const Sequelize = require("sequelize");
const { pick, omit } = require("lodash");
const Op = Sequelize.Op;
const BaseRepo = require("./base");
const { Post } = require("../entities");
const { setDate } = require("@utils/datastore/helpers");
const queriesHelper = require("@utils/datastore/helpers/queriesPostsModel");

class PostRepo extends BaseRepo({ Entity: Post }) {
  static demapOne(entity) {
    return {
      id: entity.id,
      message: entity.message,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async getPost(id) {
    const options = {}
    options.include = [
      { model: this.query.models.Parsed },
      { model: this.query.models.PostState },
      { model: this.query.models.PostDetails, as: "PostDetails" },
    ]
    return this.getById(id, options);
  }

  async createPost(input) {
    const options = {}
    options.include = [
      { association: this.gateway.Post.PostState },
      { association: this.gateway.Post.PostDetails }
    ]
    return this.createOne(input, options);
  }

  async updatePost(id, status) {
    return this.updateOne(id, status);
  }

  async bindPost(parsedId, id) {
    return this.updateOne(id, { parsedId });
  }

  async getPostsWithParsed(search) {
    return this.gateway.Post.findAll({
      include: { model: this.gateway.Parsed },
    });
  }

  async getPostsWithParsedFilteredByDate(date) {
    const options = setDate(date, "time", {});
    options.include = { model: this.gateway.Parsed };
    return this.gateway.Post.findAll(options);
  }

  async getAllByStatus(states, type, search, date, option) {
    let options = {...option};
    options.include = [
      { model: this.gateway.Parsed },
      { model: this.gateway.PostState },
      { model: this.gateway.PostDetails, as: "PostDetails" },
    ]
    const optionsAnd = []
    const whereStates = queriesHelper.getWhereStates(states);
    if(whereStates) optionsAnd.push(whereStates)
    const whereSearch = queriesHelper.getWhereSearch(search);
    if(whereSearch) optionsAnd.push(whereSearch)
    const whereType = queriesHelper.getWhereType(type);
    if(whereType) optionsAnd.push(whereType)
    const whereDate = queriesHelper.getWhereDate(date);
    if(whereDate) optionsAnd.push(whereDate)

    if(optionsAnd.length === 1){
      options.where = optionsAnd[0]
    } else {
      options.where = { [Op.and]: optionsAnd }
    }
    return this.gateway.Post.findAll(options);
  }

  async getCountByStatus(states, type, search, date, option) {
    let options = {...option};
    options.include = [
      { model: this.gateway.Parsed },
      { model: this.gateway.PostState },
      { model: this.gateway.PostDetails, as: "PostDetails" },
    ]
    const optionsAnd = []
    const whereStates = queriesHelper.getWhereStates(states);
    if(whereStates) optionsAnd.push(whereStates)
    const whereSearch = queriesHelper.getWhereSearch(search);
    if(whereSearch) optionsAnd.push(whereSearch)
    const whereType = queriesHelper.getWhereType(type);
    if(whereType) optionsAnd.push(whereType)
    const whereDate = queriesHelper.getWhereDate(date);
    if(whereDate) optionsAnd.push(whereDate)

    if(optionsAnd.length === 1){
      options.where = optionsAnd[0]
    } else {
      options.where = { [Op.and]: optionsAnd }
    }
    return this.count(options);
  }

  async setClearedStatus() {
    return await this.gateway.sequelize.query(
      "UPDATE post_state SET status = 'archived' WHERE status = 'rejected' returning id"
    );
  }

  toJSON (post) {
    return {
      ...post.attr,
      Parseds: post.attr.Parseds.map(parsed => omit(parsed.get(), ["id", "post_id", "createdAt", "updatedAt"])),
      PostState: post.attr?.PostState ? pick(post.attr.PostState.get(), ["id", "status", "old_status", "order"]) : {},
      PostDetails: post.attr?.PostDetails ? pick(post.attr.PostDetails.get(), ["type", "contact_email" ]) : {},
    }
  }
}

module.exports = PostRepo;
