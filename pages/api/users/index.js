const {
  db,
  models: { User },
} = require("../../../db");

export default async function userHandler(req, res) {
  try {
    await db.authenticate();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  //add verification with auth0 function

  const {
    body: { identifier, firstName, lastName, email },
    method,
  } = req;

  switch (method) {
    case "GET":
      const users = await User.findAll();
      res.status(200).json(users);
      break;
    case "POST":
      //CREATE a new user
      const [user, created] = await User.findOrCreate({
        where: {
          identifier: identifier,
        },
        defaults: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
      if (!created) {
        user.update({ firstName, lastName, email });
      }
      res.status(201).json(user);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
