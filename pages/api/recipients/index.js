const {
  db,
  models: { Recipient, Note, User },
} = require("../../../db");

const Sequelize = require("sequelize");

export default async function recipientHandler(req, res) {
  try {
    await db.authenticate();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    body: { updateInfo, userId },
    method,
  } = req;

  switch (method) {
    case "POST":
      //ADD NEW RECIPIENT
      const originalLength = await Recipient.findAll();
      updateInfo.id = originalLength.length + 1;
      updateInfo.individualHooks = true
      const newRecipient = await Recipient.create(updateInfo);
      await newRecipient.addUser(userId);
      res.status(201).json(newRecipient);
      break;

    case "PUT":
      // UPDATE SINGLE RECIPIENT
      console.log(req.body);
      const recipient = await Recipient.findByPk(userId);
      const updatedRecipient = await recipient.update(updateInfo);
      res.status(200).json(updatedRecipient);
      break;

    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
