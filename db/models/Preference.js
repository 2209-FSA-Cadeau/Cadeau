const Sequelize = require("sequelize");
const db = require("../db");

const Preference = db.define("preference", {
  preference: {
    type: Sequelize.ENUM('like', 'dislike'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Preference;
