const {
  db,
  models: { User },
} = require("../../../db");

export default async function userIdHandler(req, res) {
  try {
    await db.authenticate();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    query: { userId },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      const user = await User.findByPk(userId);
      res.status(200).json(user);
      break;
    case "PUT":
      // Update data in your database
      res.status(200).json({ userId });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
