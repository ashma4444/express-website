const mailer = require("../../services/mailer");
const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const { to, QRCode } = req.body;
    if (!to || !QRCode) {
      throw new Error("Data is required");
    }

    const data = await mailer.mailer({ to: to, QRCode: QRCode });
    res.json({ data });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
