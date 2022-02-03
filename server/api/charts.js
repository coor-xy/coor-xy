const router = require('express').Router();
const {
  models: { Chart, Data },
} = require('../db');

// get all charts with data for user
// refactor to use findByPk user token
router.get('/', async (req, res, next) => {
  try {
    const charts = await Chart.findAll({
      include: {
        model: Data,
      },
    });
    res.send(charts).status(200);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    console.log('req', req.user);
    const charts = await Chart.findAll({
      where: {
        userId: req.params.id,
      },
      include: {
        model: Data,
      },
    });
    res.send(charts).status(200);
  } catch (err) {
    next(err);
  }
});

// this does not update the Data...
router.put('/:chartId', async (req, res, next) => {
  try {
    const chart = await Chart.findByPk(req.params.chartId, {
      include: {
        model: Data,
      },
    });
    const updated = await chart.update({
      type: req.body.type,
      title: req.body.title,
      yLabel: req.body.yLabel,
      xLabel: req.body.xLabel,
      primaryColumn: req.body.primaryColumn,
      valueColumns: req.body.valueColumns,
      Data: req.body.Data,
    });
    res.send(updated).status(200);
  } catch (err) {
    next(err);
  }
});

// deletes the association from Data but not associated row data
router.delete('/:chartId', async (req, res, next) => {
  try {
    const chart = await Chart.findByPk(req.params.chartId, {
      include: {
        model: Data,
      },
    });
    await chart.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
