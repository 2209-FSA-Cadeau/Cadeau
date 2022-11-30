const {
  db,
  models: { Note },
} = require("../../../db");

export default async function noteHandler(req, res) {
  try {
    await db.authenticate();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Unable to connect to the database:", error });
  }

  const {
    body: { userId, recipientId, content },
    method,
  } = req;

  switch(method) {
    case "GET":
      const note = await Note.findOne({
        where: {
          userId: userId,
          recipientId: recipientId
        }
      });
      res.status(200).json(note);
      break;
    case "POST":
      const createdNote = await Note.create({ userId, recipientId, content });
      res.status(201).json(createdNote);
      break;
    case "PUT":
      const foundNote = await Note.findOne({
        where: {
          userId: userId,
          recipientId: recipientId
        }
      });
      await foundNote.update({ content: content });
      res.status(201).json(foundNote);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
