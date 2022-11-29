const db = require('./db')

const User = require('./models/User')
const Recipient = require('./models/Recipient')
const Preference = require('./models/Preference')
const Note = require('./models/Note')

//associations could go here!

User.belongsToMany(Recipient, {through: Note})
Recipient.belongsToMany(User, {through: Note})

Recipient.hasMany(Preference)
Preference.belongsTo(Recipient)

User.hasMany(Note)
Note.belongsTo(User)

Recipient.hasMany(Note)
Note.belongsTo(Recipient)


async function syncDb(){
  await db.sync()
  console.log("DATABASE HAS BEEN SYNCED")
}


syncDb()

// if(process.env.seed === true){
  
// }



module.exports = {
  db,
  models: {
    User,
    Recipient,
    Preference,
    Note
  },
}

