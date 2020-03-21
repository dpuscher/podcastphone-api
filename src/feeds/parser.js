const xml2js = require("xml2js");
const axios = require("axios").default;

module.exports = async url => {
  const { data } = await axios.get(url);

  const parser = new xml2js.Parser();
  return await parser.parseStringPromise(data);
};
