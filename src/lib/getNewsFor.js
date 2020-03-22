const zdfHeuteFeed = require("../feeds/zdfHeuteFeed");
const isEmpty = require("../helper/isEmpty");

const FEEDS = {};

const getGeneralNews = async () => ({
  state: "Deutschland",
  items: await zdfHeuteFeed(),
});

module.exports = async (state) => {
  if (isEmpty(state)) return getGeneralNews();

  const feed = FEEDS[state];
  if (!feed) return getGeneralNews();

  return [];
};
