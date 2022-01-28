//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Chart = require('./models/Chart')

//associations could go here!
Chart.belongsTo(User)
User.hasMany(Chart)

module.exports = {
  db,
  models: {
    User,
    Chart
  },
}
