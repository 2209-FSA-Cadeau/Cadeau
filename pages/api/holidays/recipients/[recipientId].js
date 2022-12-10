const {
    db,
    models: { Holiday },
  } = require("../../../../db");

  export default async function recipientHolidayHandler(req, res) {
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
        const gifts = await Holiday.findAll({
          where: {
            recipientId: recipientId,
          }
        });
        res.status(200).json(gifts);
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
