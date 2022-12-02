const {
    db,
    models: { Recipient, Note, User },
  } = require("../../../db");
  
  export default async function userIdRecipientHandler(req, res) {
    try {
      await db.authenticate();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Unable to connect to the database:", error });
    }
  
    const {
      query: {userId},
      method,
    } = req;
    
    switch (method) {
      case "GET":
        // GET all recipients based on user
        const userWithRecip  = await User.findOne({
            include: {
                model: Note, 
                    include:{
                        model: Recipient
                        }
                    },
            where: {id: userId}
        });

        const recipients = []
        for(let i = 0; i < userWithRecip.notes.length; i++){
          recipients.push(userWithRecip.notes[i].recipient)
        }

        res.status(200).json(recipients);
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  