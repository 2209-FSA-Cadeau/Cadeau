const Sequelize = require("sequelize");
const db = require("../db");

const Recipient = db.define("recipient", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  birthday: {
    type: Sequelize.DATEONLY,
    validate: {
        notEmpty: true,
      }
  },
  occupation: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: true
    }
  }
});

module.exports = Recipient;
