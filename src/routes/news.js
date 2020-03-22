const isEmpty = require("../helper/isEmpty");
const getNewsFor = require("../lib/getNewsFor");
const { getStateForNumber, getStateForZip } = require("../lib/getStateFor");

module.exports = async ({ query }, res) => {
  const { zip, number } = query;

  if ([zip, number].every(isEmpty)) {
    res.json(await getNewsFor());
  }

  const state = !isEmpty(number)
    ? await getStateForNumber(number)
    : await getStateForZip(zip);

  res.json(await getNewsFor(state));
};
