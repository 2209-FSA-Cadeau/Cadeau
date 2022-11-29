const Sequelize = require("sequelize");
const db = require("../db");

const Holiday = db.define("holiday", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE
  },
});

module.exports = Holiday
