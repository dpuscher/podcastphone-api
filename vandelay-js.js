const path = require("path");

const includes = ["src", "models"];

module.exports = {
  includePaths: includes.map((folder) => path.join(__dirname, folder)),
  useSingleQuotes: false,
  excludePatterns: ["**/*.spec.*", "**/__mocks__/*"],
  useES5: true,
};
