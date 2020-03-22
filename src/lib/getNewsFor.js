const feedContent = require("../feeds/feedContent");
const isEmpty = require("../helper/isEmpty");

const FALLBACK_FEED = "https://www.zdf.de/rss/zdf/nachrichten";

const FEEDS = {
  Berlin:
    "https://www.berlin.de/presse/pressemitteilungen/index/feed?searchtext=corona",
};

const getGeneralNews = async () => ({
  state: "Deutschland",
  items: await feedContent(FALLBACK_FEED),
});

module.exports = async (state) => {
  if (isEmpty(state)) return getGeneralNews();

  const feed = FEEDS[state];
  if (!feed) return getGeneralNews();

  return {
    state,
    items: await feedContent(feed),
  };
};
