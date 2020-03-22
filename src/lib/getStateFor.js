const getStateQuery = require("./getStateQuery");
const { sequelize } = require("../../models");
const isEmpty = require("../helper/isEmpty");
const { Area } = require("../../models");

const getStateForPrefix = async (prefix) => {
  const [result = {}] = await sequelize.query(getStateQuery("prefix"), {
    replacements: { value: prefix },
    type: sequelize.QueryTypes.SELECT,
  });

  return result.state;
};

const getStateForZip = async (zip) => {
  const area = await Area.findOne({ where: { zip } });
  return area ? area.state : null;
};

const getStateForNumber = async (numberInput) => {
  if (isEmpty(numberInput)) return null;

  const number = numberInput.replace(/\+49/, 0).replace(/^0049/, 0);
  if (number[0] !== "0") return null;
  if (number[1] === "0" || number[1] === "1") return null;

  let state;

  for (let i = 6; i >= 3; i -= 1) {
    const prefix = number.substring(0, i);
    // eslint-disable-next-line no-await-in-loop
    const newState = await getStateForPrefix(prefix);
    if (newState) {
      state = newState;
      break;
    }
  }

  return state;
};

module.exports = {
  getStateForPrefix,
  getStateForZip,
  getStateForNumber,
};
