const Sequelize = require('sequelize');
const db = require('../db');

const Chart = db.define('chart', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  colorPref: {
    type: Sequelize.JSON,
  },
  title: {
    type: Sequelize.STRING,
  },
  yLabel: {
    type: Sequelize.STRING,
  },
  xLabel: {
    type: Sequelize.STRING,
  },
  primaryColumn: {
    type: Sequelize.STRING,
  },
  valueColumns: {
    type: Sequelize.JSON,
  },
  width: {
    type: Sequelize.INTEGER
  },
  height: {
    type: Sequelize.INTEGER
  },
  legend: {
    type: Sequelize.BOOLEAN
  },
  grid: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Chart;
