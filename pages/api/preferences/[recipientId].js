const {
    db,
    models: { Recipient, Preference },
  } = require("../../../db");
  
  export default async function recipientIdPreferenceHandler(req, res) {
    try {
      await db.authenticate();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Unable to connect to the database:", error });
    }
  
    const {
      query: {recipientId},
      method,
    } = req;
  
    switch (method) {
      case "GET":
        // GET all recipients based on user
        const recipWithPref  = await Recipient.findOne({
            include: {
                model: Preference
            },
            where: {id: recipientId}
        });

        const preferences = []
        for(let i = 0; i < recipWithPref.preferences.length; i++){
          preferences.push(recipWithPref.preferences[i])
        }

        res.status(200).json(preferences);
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  