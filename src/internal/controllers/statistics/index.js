const { action } = require("@utils/controllers");
const {
  generalAvailableLookingRatio,
  availableLookingByDate,
  availableLookingByRole,
  rateMaxMedianAverage,
  roleTable,
  channelTable,
} = require("@services");

const count = action(async (req) => {
  const { date } = req.query;
  const count = await generalAvailableLookingRatio.call(date);
  return { data: count };
});

const countByDate = action(async (req) => {
  const { date } = req.query;
  const count = await availableLookingByDate.call(date);
  return { data: count };
});

const countByRole = action(async (req) => {
  const { date } = req.query;
  const count = await availableLookingByRole.call(date);
  return { data: count };
});

const rate = action(async (req) => {
  const { date } = req.query;
  const rate = await rateMaxMedianAverage.call(date);
  return { data: rate };
});

const rolesTable = action(async (req) => {
  const { date } = req.query;
  const rolesTable = await roleTable.call(date);
  return { data: rolesTable };
});

const channelsTable = action(async (req) => {
  const { date } = req.query;
  const channelsTable = await channelTable.call(date);
  return { data: channelsTable };
});

module.exports = {
  count,
  countByDate,
  countByRole,
  rate,
  rolesTable,
  channelsTable,
};
