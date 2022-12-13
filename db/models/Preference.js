const Sequelize = require("sequelize");
const db = require("../db");
const { models } = require("../db")
const {createMatrix, fillInBlanks } = require("../../algorithm")

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

Preference.afterUpdate(async () => {
    const recipients = await models.recipient.findAll({
          include: {model: Preference},
          order: [["id", "ASC"]]
      })

      const recipientPrefs = recipients.map((element) => element.preferences)

      const matrix = createMatrix(recipientPrefs)

      for(let i = 1; i <= recipients.length; i++){
        const score = fillInBlanks(matrix, i)
        const updateObj = {recommendations: score}
        await recipients[i - 1].update(updateObj)
      }
})

Preference.afterDestroy(async () => {
    const recipients = await models.recipient.findAll({
      include: {model: Preference},
      order: [["id", "ASC"]]
  })

  const recipientPrefs = recipients.map((element) => element.preferences)

  const matrix = createMatrix(recipientPrefs)

  for(let i = 1; i <= recipients.length; i++){
    const score = fillInBlanks(matrix, i)
    const updateObj = {recommendations: score}
    await recipients[i - 1].update(updateObj)
  }
})

module.exports = Preference;
