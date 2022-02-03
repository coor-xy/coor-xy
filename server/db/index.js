//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Chart = require('./models/Chart')
const DataTable = require('./models/DataTable')

//associations could go here!
Chart.belongsTo(User)
User.hasMany(Chart)
DataTable.hasMany(Chart)
Chart.belongsTo(DataTable)
User.hasMany(DataTable)
DataTable.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Chart,
    DataTable
  },
}
