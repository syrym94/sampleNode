const BaseService = require("@services/base");
const { median, average } = require("../../../helpers/misc");

class ChannelTable extends BaseService {
  get parsedRepo() {
    return this.deps.parsedRepo;
  }

  get postRepo() {
    return this.deps.postRepo;
  }

  async call(date) {
    const posts = await this.postRepo.getPostsWithParsedFilteredByDate(date);
    const channels = {};
    for (let i = 0; i < posts.length; i++) {
      channels[posts[i].channelTitle] = {
        selected:
          posts[i]?.status === "selected"
            ? channels[posts[i].channelTitle]?.selected
              ? channels[posts[i].channelTitle].selected + 1
              : 1
            : channels[posts[i].channelTitle]?.selected
            ? channels[posts[i].channelTitle].selected
            : 0,
        posts: [...(channels[posts[i]?.channelTitle]?.posts || []), posts[i]],
      };
    }

    for (const channelTitle in channels) {
      channels[channelTitle].available = channels[channelTitle].available
        ? channels[channelTitle].available
        : 0;
      channels[channelTitle].looking = channels[channelTitle].looking
        ? channels[channelTitle].looking
        : 0;
      for (let i = 0; i < channels[channelTitle].posts.length; i++) {
        for (let j = 0; j < posts[i].Parseds.length; j++) {
          channels[channelTitle] = {
            selected: channels[channelTitle].selected,
            available:
              posts[i].Parseds[j]?.position === "available"
                ? channels[channelTitle].available + 1
                : channels[channelTitle].available,
            looking:
              posts[i].Parseds[j]?.position === "looking"
                ? channels[channelTitle].looking + 1
                : channels[channelTitle].looking,
            posts: channels[channelTitle].posts,
            rates: posts[i].Parseds[j]?.rates
              ? [
                  ...(channels[channelTitle]?.rates || []),
                  Number.parseInt(posts[i]?.Parseds[j]?.rates),
                ]
              : [0],
          };
        }
      }
    }

    for (const channelTitle in channels) {
      channels[channelTitle] = {
        selected: channels[channelTitle].selected,
        available: channels[channelTitle].available,
        looking: channels[channelTitle].looking,
        max: channels[channelTitle]?.rates
          ? Math.max(...channels[channelTitle]?.rates)
          : 0,
        median: channels[channelTitle]?.rates
          ? median(channels[channelTitle]?.rates)
          : 0,
        average: channels[channelTitle]?.rates
          ? average(channels[channelTitle]?.rates)
          : 0,
      };
    }

    return channels;
  }
}

module.exports = ChannelTable;
