const parser = require("./parser");
const get = require("lodash/get");
const format = require("date-fns/format");
const de = require("date-fns/locale/de");
const feedItem = require("./feedItem");

const FEED_URL = "https://www.zdf.de/rss/zdf/nachrichten";

module.exports = async (limit = 5) => {
  const data = await parser(FEED_URL);

  const items = get(data, "rss.channel.0.item");

  return items.slice(0, limit).map(item => {
    let date, time;

    const title = get(item, "title.0");
    const content = get(item, "description.0");
    const pubDate = get(item, "pubDate.0");

    try {
      const timestamp = new Date(pubDate);
      date = format(timestamp, "d. MMMM yyyy", { locale: de });
      time = format(timestamp, "h:mm", { locale: de });
    } catch (e) {
      // ignore date parsing errors
      console.error(e);
    }

    return feedItem(title, date, time, content);
  });
};
