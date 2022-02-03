//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Chart = require('./models/Chart')
const Data = require('./models/Data')

//associations could go here!
Chart.belongsTo(User)
User.hasMany(Chart)
Data.hasMany(Chart)
Chart.belongsTo(Data, {
  foreignKey: 'dataId'
})
User.hasMany(Data)
Data.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Chart,
    Data
  },
}
