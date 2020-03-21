const express = require("express");
const compression = require("compression");
const { Area } = require("../models");
const isEmpty = require("./helper/isEmpty");
const zdfHeuteFeed = require("./feeds/zdfHeuteFeed");

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(compression());

app.get("/", (req, res) => {
  res.json({ info: "Hello World!" });
});

app.get("/data", async ({ query }, res) => {
  // data = await Area.findAll({});
  const { zip, prefix } = query;

  if ([zip, prefix].every(isEmpty)) {
    res.json({ error: "At least zip or prefix need to be defined" });
  }
  const queryParams = !isEmpty(prefix) ? { prefix } : { zip };
  const area = await Area.findOne({ where: queryParams });

  if (!area) {
    res.json({ error: "No entry found for given parameters" });
  }

  res.json({
    state: area.state,
  });
});

app.get("/news", async ({ query }, res) => {
  const news = await zdfHeuteFeed();
  res.json(news);
});

// eslint-disable-next-line no-console
app.listen({ port }, () =>
  console.log(`☎️ Server ready at http://localhost:${port}`),
);
