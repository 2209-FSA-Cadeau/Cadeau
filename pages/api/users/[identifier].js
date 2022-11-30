const {
  db,
  models: { User },
} = require("../../../db");

export default async function userIdentifierHandler(req, res) {
  try {
    await db.authenticate();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    query: { identifier },
    method,
  } = req;

  switch (method) {
    case "GET":
      // GET single user based on their identifier
      const user = await User.findOne({
        where: {identifier: identifier}
      });
      res.status(200).json(user);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
