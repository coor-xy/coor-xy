const router = require("express").Router();
const {
  models: { DataTable, Chart },
} = require("../db");
const { isUser } = require("./gatekeeping");

router.get("/", isUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await DataTable.findAll({
      where: {
        userId: userId,
      },
      attributes: ["id", "data", "userId"],
    });
    res.send(data).status(200);
  } catch (err) {
    next(err);
  }
});

router.get("/:dataId", isUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { dataId } = req.params;
    const data = await DataTable.findByPk(dataId, {
      attributes: ["id", "data", "userId"],
    });
    if (!data.id) {
      const error = new Error("Data Not Found");
      error.status = 404;
      next(error);
    } else if (data.userId !== userId) {
      const error = new Error("Not Authorized to access this data");
      error.status = 401;
      next(error);
    } else {
      res.send(data).status(200);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", isUser, async (req, res, next) => {
  try {
    console.log(req.body)
    const userId = req.user.id;
    const { data } = req.body;
    const addedData = await DataTable.create({ data, userId });
    const newData = await DataTable.findByPk(addedData.id, {
      attributes: ["id", "data", "userId"],
    });

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
      height,
    } = req.body.config
    const dataTableId = addedData.id
    await Chart.create({
      type,
      title,
      yLabel,
      xLabel,
      primaryColumn,
      valueColumns,
      width,
      height,
      legend,
      grid,
      userId,
      dataTableId,
    });
    res.send(newData).status(200);
  } catch (err) {
    next(err);
  }
});

router.put("/:dataId", isUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { dataId } = req.params;
    const { data } = req.body;
    const dataInstance = await DataTable.findByPk(dataId, {
      attributes: ["id", "data", "userId"],
    });
    if (!dataInstance.id) {
      const error = new Error("Data Not Found");
      error.status = 404;
      next(error);
    } else if (dataInstance.userId !== userId) {
      const error = new Error("Not Authorized to edit this data");
      error.status = 401;
      next(error);
    } else {
      const updatedData = await dataInstance.update({ data });
      res.send(updatedData).status(200);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:dataId", isUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { dataId } = req.params;
    const dataInstance = await DataTable.findByPk(dataId, {
      attributes: ["id", "data", "userId"],
    });
    if (!dataInstance.id) {
      const error = new Error("Data Not Found");
      error.status = 404;
      next(error);
    } else if (dataInstance.userId !== userId) {
      const error = new Error("Not Authorized to delete this data");
      error.status = 401;
      next(error);
    } else {
        await dataInstance.destroy();
      res.send(dataInstance).status(200);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
