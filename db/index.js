const db = require('./db')

const User = require('./models/User')
const Comment = require('./models/Comment')
const Gift = require('./models/Gift')
const Holiday = require('./models/Holiday')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Comment,
    Gift,
    Holiday,
  },
}
