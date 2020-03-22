const express = require("express");
const compression = require("compression");

const newsRoute = require("./routes/news");

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(compression());

app.get("/", (req, res) => {
  res.json({ info: "PodcastPhone API is working" });
});

app.get("/news", newsRoute);

// eslint-disable-next-line no-console
app.listen({ port }, () =>
  console.log(`☎️ Server ready at http://localhost:${port}`),
);
