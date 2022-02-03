const Sequelize = require('sequelize')
const db = require('../db')

const DataTable = db.define('dataTable', {
    data: {
        type: Sequelize.JSON
    }
});

module.exports = DataTable;
