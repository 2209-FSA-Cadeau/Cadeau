const {
  db,
  models: { Gift },
} = require("../../../db");

export default async function giftIdHandler(req, res) {
  try {
    await db.authenticate();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    query: { giftId },
    method,
  } = req;

  switch (method) {
    case "DELETE":
      const gift = await Gift.findByPk(giftId);
      await gift.destroy();
      res.status(200).json(gift);
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
