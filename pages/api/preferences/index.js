const {
    db,
    models: { Preference },
  } = require("../../../db");
  
  export default async function preferenceHandler(req, res) {
    try {
      await db.authenticate();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Unable to connect to the database:", error });
    }
  
    const {
      body: {recipientId, preferenceId, updateInfo},
      method,
    } = req;
  
    switch (method) {
      case "POST":
        //ADD NEW PREFERENCE
        const newPreference = await Preference.create(updateInfo)
        await newPreference.setRecipient(recipientId)
        res.status(201).json(newPreference)
        break;

      case "PUT":
        // UPDATE SINGLE PREFERENCE
        const preference = await Preference.findByPk(preferenceId)
        const updatedPreference = await preference.update(updateInfo)
        res.status(200).json(updatedPreference);
        break;
    
      case "DELETE":
        //DELETE SINGLE RECIPIENT
        await Preference.destroy({
            where: {id: preferenceId}
        })
        res.status(204).end()
        break;

      default:
        res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  