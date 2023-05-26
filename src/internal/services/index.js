const { postRepo, parsedRepo, historyRepo, postStateRepo, postDetailsRepo } = require("@repos");


const PostGetService = require("./posts/postGetService");

const PostParseService = require("./posts/postParseService");



const PostStateService = require("./posts/postStateService");
const PostUpdateService = require("./posts/postUpdateService");

const PostCreateService = require("./posts/postCreateService");
const ParsedGridService = require("./parseds/parsedGridService");
const ParsedCreateService = require("./parseds/parsedCreateService");
const PostWithParsedGridService = require("./posts/postWithParsedsGridService");
const PostBrowseService = require("./posts/postBrowseService");
const PostByPositionService = require("./posts/postByPositionService");
const PostsByStatusService = require("./posts/postsByStatusService");
const PostRejectedClearService = require("./posts/postRejectedClearService");
const ParsedUpdateService = require("./parseds/parsedUpdateService");
const GeneralAvailableLookingRatio = require("./statistics/generalAvailableLookingRatio");
const AvailableLookingByDate = require("./statistics/availableLookingByDate");
const AvailableLookingByRole = require("./statistics/availableLookingByRole");
const RateMaxMedianAverage = require("./statistics/rateMaxMedianAverage");
const RoleTable = require("./statistics/roleTable");
const ChannelTable = require("./statistics/channelTable");
const HistoriesByPostIdService = require("./history/historiesByPostIdService");
const HistoryCreateService = require("./history/historyCreateService");
const HistoryDeleteService = require("./history/historyDeleteService");

module.exports = {
  postGetService: new PostGetService({ postRepo }),
  postUpdateService: new PostUpdateService({ postRepo, parsedRepo, postDetailsRepo }),
  
  postParseService: new PostParseService({ postRepo, parsedRepo, postDetailsRepo }),


  postStateService: new PostStateService({ postStateRepo }),

  postCreateService: new PostCreateService({ postRepo }),
  parsedGridService: new ParsedGridService({ parsedRepo }),
  parsedCreateService: new ParsedCreateService({ parsedRepo, postRepo }),
  postWithParsedGridService: new PostWithParsedGridService({ postRepo }),
  postBrowseService: new PostBrowseService({ postRepo }),
  postByPositionService: new PostByPositionService({ postRepo }),
  postRejectedClearService: new PostRejectedClearService({ postRepo }),
  postByStatusService: new PostsByStatusService({ postRepo }),
  historiesByPostIdService: new HistoriesByPostIdService({ historyRepo }),
  historyCreateService: new HistoryCreateService({ historyRepo }),
  historyDeleteService: new HistoryDeleteService({ historyRepo }),
  parsedUpdateService: new ParsedUpdateService({ parsedRepo }),
  generalAvailableLookingRatio: new GeneralAvailableLookingRatio({
    parsedRepo, postRepo
  }),
  availableLookingByDate: new AvailableLookingByDate({ parsedRepo, postRepo }),
  availableLookingByRole: new AvailableLookingByRole({ parsedRepo, postRepo }),
  rateMaxMedianAverage: new RateMaxMedianAverage({ parsedRepo }),
  roleTable: new RoleTable({ parsedRepo, postRepo }),
  channelTable: new ChannelTable({ parsedRepo, postRepo }),
};
