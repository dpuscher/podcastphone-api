const express = require("express");
const compression = require("compression");

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(compression());

app.get("/", (req, res) => {
  res.json({ info: "Hello World!" });
});

// eslint-disable-next-line no-console
app.listen({ port }, () =>
  console.log(`☎️ Server ready at http://localhost:${port}`),
);
