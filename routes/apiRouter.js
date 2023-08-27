const router = require("express").Router();
const qrRouter = require("../modules/qr/qr.api");
const mailRouter = require("../modules/mailer/mailer.api");

router.use("/qr", qrRouter);

router.use("/mailer", mailRouter);

module.exports = router;
