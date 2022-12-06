const {
  db,
  models: { Gift, Recipient },
} = require("../../../db");

export default async function giftHandler(req, res) {
  try {
    await db.authenticate();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    body: { recipientId, name, description, imageUrl, price, link, rating },
    method,
  } = req;

  switch(method) {
    case "GET":
      const gifts = await Gift.findAll();
      res.status(200).json(gifts);
      break;
    case "POST":
      const gift = await Gift.create({ name, description, imageUrl, price, link, rating });
      const recipient = await Recipient.findByPk(recipientId);
      recipient.addGift(gift);
      res.status(201).json(gift);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
