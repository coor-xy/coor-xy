const router = require("express").Router();
const {
  models: { Chart, DataTable },
} = require("../db");
const { isUser } = require("./gatekeeping");

router.get("/", isUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const charts = await Chart.findAll({
      where: {
        userId: userId,
      },
      attributes: [
        "id",
        "type",
        "title",
        "yLabel",
        "xLabel",
        "primaryColumn",
        "valueColumns",
        "userId",
        "legend",
        "grid",
        "width",
        "height",
      ],
      include: {
        model: DataTable,
        attributes: ["data","id"],
      },
    });
    res.send(charts).status(200);
  } catch (err) {
    next(err);
  }
});

router.get("/:chartId", isUser, async (req, res, next) => {
  try {
    const { chartId } = req.params;
    const userId = req.user.id;
    const chart = await Chart.findByPk(chartId, {
      attributes: [
        "id",
        "type",
        "title",
        "yLabel",
        "xLabel",
        "primaryColumn",
        "valueColumns",
        "userId",
        "legend",
        "grid",
        "width",
        "height",
      ],
      include: {
        model: DataTable,
        attributes: ["data"],
      },
    });
    if (!chart.id) {
      const error = new Error("Chart Not Found");
      error.status = 404;
      next(error);
    } else if (chart.userId !== userId) {
      const error = new Error("Not Authorized to view this chart");
      error.status = 401;
      next(error);
    } else {
      res.send(chart).status(200);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", isUser, async (req, res, next) => {
  try {
    const {
      type,
      title,
      yLabel,
      xLabel,
      primaryColumn,
      valueColumns,
      dataTableId,
      legend,
      grid,
      width,
      height,
    } = req.body;
    const userId = req.user.id;
    const newChart = await Chart.create({
      type,
      title,
      yLabel,
      xLabel,
      primaryColumn,
      valueColumns,
      dataTableId,
      userId,
      legend,
      grid,
      width,
      height
    });
    const chart = await Chart.findByPk(newChart.id, {
      attributes: [
        "id",
        "type",
        "title",
        "yLabel",
        "xLabel",
        "primaryColumn",
        "valueColumns",
        "userId",
        "legend",
        "grid",
        "width",
        "height",
      ],
      include: {
        model: DataTable,
        attributes: ["data"],
      },
    });
    res.send(chart).status(200);
  } catch (err) {
    next(err);
  }
});

router.put("/:chartId", isUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      type,
      title,
      yLabel,
      xLabel,
      primaryColumn,
      valueColumns,
      legend,
      grid,
      width,
      height
    } = req.body;
    const { chartId } = req.params;
    const chart = await Chart.findByPk(chartId, {
      attributes: [
        "id",
        "type",
        "title",
        "yLabel",
        "xLabel",
        "primaryColumn",
        "valueColumns",
        "userId",
        "legend",
        "grid",
        "width",
        "height",
      ],
      include: {
        model: DataTable,
        attributes: ["data"],
      },
    });
    if (!chart.id) {
      const error = new Error("Chart Not Found");
      error.status = 404;
      next(error);
    } else if (chart.userId !== userId) {
      const error = new Error("Not Authorized to edit this chart");
      error.status = 401;
      next(error);
    } else {
      const updatedChart = await chart.update({
        type,
        title,
        yLabel,
        xLabel,
        primaryColumn,
        valueColumns,
        legend,
        grid,
        width,
        height
      });
      res.send(updatedChart).status(200);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:chartId", isUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { chartId } = req.params;
    const chart = await Chart.findByPk(chartId, {
      attributes: [
        "id",
        "type",
        "title",
        "yLabel",
        "xLabel",
        "primaryColumn",
        "valueColumns",
        "userId",
      ],
      include: {
        model: DataTable,
        attributes: ["data"],
      },
    });
    if (!chart.id) {
      const error = new Error("Chart Not Found");
      error.status = 404;
      next(error);
    } else if (chart.userId !== userId) {
      const error = new Error("Not Authorized to delete this chart");
      error.status = 401;
      next(error);
    } else {
      await chart.destroy();
      res.send(chart).status(200);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
