const Sequelize = require("sequelize");
const db = require("../db");

const Note = db.define("note", {
  content: {
    type: Sequelize.TEXT,
    defaultValue: "",
  },
});

module.exports = Note;
