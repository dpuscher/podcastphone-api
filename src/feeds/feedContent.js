const get = require("lodash/get");
const format = require("date-fns/format");
const de = require("date-fns/locale/de");
const striptags = require("striptags");
const isEmpty = require("../helper/isEmpty");
const parser = require("./xmlParser");
const feedItem = require("./feedItem");

module.exports = async (url, limit = 5) => {
  if (isEmpty(url) || limit <= 0) return [];

  const data = await parser(url);

  const items = get(data, "rss.channel.0.item");

  return items.slice(0, limit).map((item) => {
    let date;
    let time;

    const title = get(item, "title.0");
    const content = striptags(get(item, "description.0"));
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
