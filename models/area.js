"use strict";
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define(
    "Area",
    {
      location: DataTypes.STRING,
      zip: DataTypes.STRING,
      prefix: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    { timestamps: false },
  );
  Area.associate = function(models) {
    // associations can be defined here
  };
  return Area;
};
