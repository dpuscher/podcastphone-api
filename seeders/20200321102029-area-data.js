"use strict";

const fs = require("fs");
const csv = require("csv-parser");
const DATA_FILE = "./data/plz_de.csv";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream("./data/plz_de.csv")
        .pipe(csv({ separator: ";" }))
        .on("data", data => {
          results.push({
            location: data["Ort"],
            zip: data["Plz"],
            prefix: data["Vorwahl"],
            state: data["Bundesland"],
          });
        })
        .on("end", () => {
          queryInterface.bulkInsert("Areas", results, {}).then(() => {
            resolve();
          });
        });
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
