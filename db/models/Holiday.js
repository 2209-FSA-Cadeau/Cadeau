const Sequelize = require("sequelize");
const db = require("../db");

const Holiday = db.define("holiday", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Holiday
