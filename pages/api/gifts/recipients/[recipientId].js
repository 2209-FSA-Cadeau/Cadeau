const {
  db,
  models: { Gift, Recipient },
} = require("../../../../db");

export default async function recipientGiftHandler(req, res) {
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
    case "GET":
      const gifts = await Recipient.findAll({
        where: {
          id: 2,
        },
        include: { model: Gift },
      });
      res.status(200).json(gifts);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
