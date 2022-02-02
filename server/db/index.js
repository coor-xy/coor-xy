//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Chart = require('./models/Chart')
const RowData = require('./models/RowData')

//associations could go here!
Chart.belongsTo(User)
User.hasMany(Chart)
RowData.belongsTo(Chart)
Chart.hasMany(RowData)

module.exports = {
  db,
  models: {
    User,
    Chart,
    RowData
  },
}
