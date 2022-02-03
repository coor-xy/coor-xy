const router = require('express').Router();
const {
  models: { Chart, DataTable },
} = require('../db');

// get all charts with data for user
// refactor to use findByPk user token
router.get('/', async (req, res, next) => {
  try {
    const tempUserId = 1;     //Grab from User Token

    const charts = await Chart.findAll({
      where: {
        userId: tempUserId
      },
      attributes: [
        "id", "type", "colorPref", "title",  "yLabel", "xLabel",  "primaryColumn", "valueColumns", "userId"
      ],
      include: {
        model: DataTable,
        attributes: ["data"]
      },
    });
    res.send(charts).status(200);
  } catch (err) {
    next(err);
  }
});


router.get('/:chartId', async (req, res, next) => {
  try {
    const { chartId } = req.params
    const chart = await Chart.findByPk(chartId, {
      attributes: [
        "id", "type", "colorPref", "title",  "yLabel", "xLabel",  "primaryColumn", "valueColumns", "userId"
      ],
      include: {
        model: DataTable,
        attributes: ["data"]
      },
    });
    res.send(chart).status(200);
  } catch (err) {
    next(err);
  }
});

// this does not update the Data...
router.put('/:chartId', async (req, res, next) => {
  try {
    const tempUserId = 1;     //Grab from User Token
    const {type, colorPref, title,  yLabel, xLabel,  primaryColumn, valueColumns} = req.body
    const { chartId } = req.params
    const chart = await Chart.findByPk(chartId, {
      attributes: [
        "id", "type", "colorPref", "title",  "yLabel", "xLabel",  "primaryColumn", "valueColumns", "userId"
      ],
      include: {
        model: DataTable,
        attributes: ["data"]
      },
    });
    if (!chart.id) {
      const error = new Error("Chart Not Found")
      error.status = 404;
      next(error)
    }
    else if (chart.userId !== tempUserId) {
      const error = new Error("Not Authorized to edit this chart")
      error.status = 401;
      next(error)
    }
    else {
      const updatedChart = await chart.update({
        type,
        colorPref,
        title,
        yLabel,
        xLabel,
        primaryColumn,
        valueColumns,
      });
      res.send(updatedChart).status(200);
    }
  } catch (err) {
    next(err);
  }
});

// deletes the association from Data but not associated row data
router.delete('/:chartId', async (req, res, next) => {
  try {
    const tempUserId = 1;     //Grab from User Token
    const { chartId } = req.params
    const chart = await Chart.findByPk(chartId, {
      attributes: [
        "id", "type", "colorPref", "title",  "yLabel", "xLabel",  "primaryColumn", "valueColumns", "userId"
      ],
      include: {
        model: DataTable,
        attributes: ["data"]
      },
    });
    if (!chart.id) {
      const error = new Error("Chart Not Found")
      error.status = 404;
      next(error)
    }
    else if (chart.userId !== tempUserId) {
      const error = new Error("Not Authorized to delete this chart")
      error.status = 401;
      next(error)
    }
    else {
      await chart.destroy();
      res.send(chart).status(200);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
