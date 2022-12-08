const Sequelize = require("sequelize");
const db = require("../db");
const { models } = require("../db")
const {createMatrix, fillInBlanks } = require("../../algorithm")

const Recipient = db.define("recipient", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  birthday: {
    type: Sequelize.STRING,
  },
  occupation: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: true
    }
  },
  recommendations: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  }
});

// Recipient.afterCreate(async () => {
//   const recipients = await Recipient.findAll({
//         include: {model: models.preference},
//         order: [["id", "ASC"]]
//     })

//     const recipientPrefs = recipients.map((element) => element.preferences)

//     const matrix = createMatrix(recipientPrefs)

//     for(let i = 1; i <= recipients.length; i++){
//       const score = fillInBlanks(matrix, i)
//       const updateObj = {recommendations: score}
//       console.log(i, score)
//       await recipients[i - 1].update(updateObj)
//     }
// })

Recipient.afterDestroy(async (recipient) => {
  const changeId = await Recipient.findAll({
    where: {
      id: {
        [Sequelize.Op.gt]: recipient.id
      }
    },
    order: [["id", "ASC"]]
  })

  for(let i = 0; i < changeId.length; i++){
    await changeId[i].decrement({id: 1})
  }

  const recipients = await Recipient.findAll({
    include: {model: models.preference},
    order: [["id", "ASC"]]
})

const recipientPrefs = recipients.map((element) => element.preferences)

const matrix = createMatrix(recipientPrefs)

for(let i = 1; i <= recipients.length; i++){
  const score = fillInBlanks(matrix, i)
  const updateObj = {recommendations: score}
  // console.log(i, score)
  await recipients[i - 1].update(updateObj)
}
})

module.exports = Recipient;
