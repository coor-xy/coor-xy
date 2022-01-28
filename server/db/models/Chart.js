const Sequelize = require('sequelize')
const db = require('../db')

const Chart = db.define('chart', {
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataURL: {
        type: Sequelize.STRING
    },
    colorPref: {
        type: Sequelize.STRING,
        defaultValue: 'black'
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: 'Title'
    },
    yLabel: {
        type: Sequelize.STRING,
        defaultValue: 'Y Axis'
    },
    xLabel: {
        type: Sequelize.STRING,
        defaultValue: 'X Axis'
    },
    xColumn: {
        type: Sequelize.STRING,
    },
    yColumn: {
        type: Sequelize.STRING,
    }
})

module.exports = Chart;