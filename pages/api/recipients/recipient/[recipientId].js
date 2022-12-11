const {
  db,
  models: { Recipient },
} = require("../../../../db");

export default async function recipientIdRecipientHandler(req, res) {
  try {
    await db.authenticate();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    query: { recipientId },
    method,
  } = req;

  switch (method) {
    case "DELETE":
      //DELETE SINGLE RECIPIENT
      const recipient = await Recipient.findByPk(recipientId);
      await recipient.destroy();
      res.status(200).json(recipient);
      break;

    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
