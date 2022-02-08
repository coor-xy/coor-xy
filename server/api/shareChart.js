const router = require("express").Router();
const {
  models: { Chart, DataTable },
} = require("../db");


router.get("/:chartId", async (req, res, next) => {
  try {
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
    } else {
      res.send(chart).status(200);
    }
  } catch (err) {
    next(err);
  }
});
