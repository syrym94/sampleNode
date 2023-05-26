const BaseRepo = require("./base");
const { History } = require("../entities");

class HistoryRepo extends BaseRepo({ Entity: History }) {
  static demapOne(entity) {
    return {
      message: entity.message,
    };
  }

  async getHistories() {
    return this.receiveAll();
  }

  async getHistory(id) {
    return this.getById(id);
  }

  async getHistoriesByPostId(postId) {
    const options = {
      where: {
        post_id: postId,
      },
    };
    return this.gateway.History.findAll(options);
  }

  async createHistory(input) {
    return this.createOne(input);
  }
}

module.exports = HistoryRepo;
