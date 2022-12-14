const Sequelize = require("sequelize");
const db = require("../db");

const Gift = db.define("gift", {
  name: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  link: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.DECIMAL(10, 1),
  },
});

module.exports = Gift;
