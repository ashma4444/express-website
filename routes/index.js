const router = require("express").Router();
const apiRouter = require("./apiRouter");
const uiRouter = require("./uiRouter");

router.use("/", uiRouter);
router.use("/api/v1", apiRouter);

module.exports = router;
