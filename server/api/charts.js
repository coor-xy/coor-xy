const router = require('express').Router();
const {
  models: { Chart, RowData },
} = require('../db');

// get all charts with data for user
// refactor to use findByPk user token
router.get('/:id', async (req, res, next) => {
  try {
    console.log('req', req.user);
    const charts = await Chart.findAll({
      where: {
        userId: req.params.id,
      },
      include: {
        model: RowData,
      },
    });
    res.send(charts).status(200);
  } catch (err) {
    next(err);
  }
});

// this does not update the rowData...
router.put('/:chartId', async (req, res, next) => {
  try {
    const chart = await Chart.findByPk(req.params.chartId, {
      include: {
        model: RowData,
      },
    });
    const updated = await chart.update({
      type: req.body.type,
      title: req.body.title,
      yLabel: req.body.yLabel,
      xLabel: req.body.xLabel,
      primaryColumn: req.body.primaryColumn,
      valueColumns: req.body.valueColumns,
      rowData: req.body.rowData,
    });
    res.send(updated).status(200);
  } catch (err) {
    next(err);
  }
});

// deletes the association from rowData but not associated row data
router.delete('/:chartId', async (req, res, next) => {
  try {
    const chart = await Chart.findByPk(req.params.chartId, {
      include: {
        model: RowData,
      },
    });
    await chart.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
