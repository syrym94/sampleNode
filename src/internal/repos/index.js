const PostRepo = require("./postRepo");
const PostStateRepo = require("./postStateRepo");
const PostDetailsRepo = require("./postDetailsRepo");
const ParsedRepo = require("./parsedRepo");
const HistoryRepo = require("./historyRepo");

module.exports = {
  PostRepo,
  postRepo: new PostRepo(),
  ParsedRepo,
  parsedRepo: new ParsedRepo(),
  historyRepo: new HistoryRepo(),
  postStateRepo: new PostStateRepo(),
  postDetailsRepo: new PostDetailsRepo(),
};
