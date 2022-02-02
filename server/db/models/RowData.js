const Sequelize = require('sequelize')
const db = require('../db')

const RowData = db.define('rowData', {
    rowData: {
        type: Sequelize.JSON
    }
});

module.exports = RowData;