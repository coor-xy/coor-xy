const Sequelize = require('sequelize')
const db = require('../db')

const Data = db.define('data', {
    data: {
        type: Sequelize.JSON
    }
});

module.exports = Data;
