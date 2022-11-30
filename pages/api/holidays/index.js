const {
  db,
  models: { Holiday },
} = require("../../../db");

export default async function holidayHandler(req, res) {
  try {
    await db.authenticate();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    body: { name, date, recipientId },
    method,
  } = req;

  switch(method) {
    case "GET":
      const holidays = await Holiday.findAll({ where: { recipientId: recipientId }});
      res.status(200).json(holidays);
      break;
    case "POST":
      const holiday = await Holiday.create({ name, date, recipientId });
      res.status(201).json(holiday);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
