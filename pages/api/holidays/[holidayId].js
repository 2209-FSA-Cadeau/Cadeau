const {
  db,
  models: { Holiday },
} = require("../../../db");

export default async function holidayIdHandler(req, res) {
  try {
    await db.authenticate();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    query: { holidayId },
    body: { name, date },
    method,
  } = req;

  switch (method) {
    case "PUT":
      const holiday = await Holiday.findByPk(holidayId);
      await holiday.update({ name: name, date: date })
      res.status(201).send(holiday);
      break;
    case "DELETE":
      const holidayToDelete = await Holiday.findByPk(holidayId);
      await holidayToDelete.destroy();
      res.status(200).json(holidayToDelete);
      break;
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
