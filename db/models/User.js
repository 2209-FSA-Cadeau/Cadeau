const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  identifier: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    unique: false,
  },
  lastName: {
    type: Sequelize.STRING,
    unique: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
});

module.exports = User;
