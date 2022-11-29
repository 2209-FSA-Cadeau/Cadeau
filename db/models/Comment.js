const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Comment;
