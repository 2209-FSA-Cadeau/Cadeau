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

  const { body, method } = req;

  switch (method) {
    case "POST":
      const holiday = await Holiday.create(body);
      res.status(201).json(holiday);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
