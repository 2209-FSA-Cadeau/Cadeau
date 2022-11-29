const Sequelize = require("sequelize");
const db = require("../db");

const Gift = db.define("gift", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL,
  },
  link: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Gift;
