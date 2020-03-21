"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Areas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
      },
      zip: {
        type: Sequelize.STRING,
      },
      prefix: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Areas");
  },
};
