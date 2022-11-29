const db = require('./db')

const User = require('./models/User')
const Comment = require('./models/Comment')
const Gift = require('./models/Gift')
const Holiday = require('./models/Holiday')
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
    Comment,
    Gift,
    Holiday,
    Recipient,
    Preference,
    Note
  },
}

