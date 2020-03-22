const feedContent = require("../feeds/feedContent");
const isEmpty = require("../helper/isEmpty");

const FALLBACK_FEED = "https://www.zdf.de/rss/zdf/nachrichten";

const FEEDS = {
  "Baden-Württemberg": "",
  Bayern: "https://www.bayern.de/rss",
  Berlin:
    "https://www.berlin.de/presse/pressemitteilungen/index/feed?searchtext=corona",
  Brandenburg: "https://www.rbb24.de/aktuell/index.xml/feed=rss.xml",
  Bremen: "",
  Hamburg: "http://www.ndr.de/nachrichten/hamburg/index-rss.xml",
  Hessen: "https://www.hessenschau.de/index.rss",
  "Mecklenburg-Vorpommern":
    "http://www.ndr.de/nachrichten/mecklenburg-vorpommern/index-rss.xml",
  Niedersachsen: "http://www.ndr.de/nachrichten/niedersachsen/index-rss.xml",
  "Nordrhein-Westfalen": "https://www.land.nrw/de/press-release/feed",
  "Rheinland-Pfalz": "https://www.swr.de/~rss/swraktuell/swraktuell-rp-100.xml",
  // Saarland: "",
  // Sachsen: "",
  // "Sachsen-Anhalt": "",
  "Schlewig-Holstein":
    "http://www.ndr.de/nachrichten/schleswig-holstein/index-rss.xml",
  // Thüringen: "",
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
