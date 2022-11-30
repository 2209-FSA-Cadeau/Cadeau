const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  identifier: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = User;
