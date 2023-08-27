const router = require("express").Router();
const QRController = require("./qr.controller");

router.get("/", (req, res, next) => {
  res.send("k cha from API qr");
});

router.post("/", async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      throw new Error("URL is required");
    }
    // const databata = await QRController.qrGenarator(url);
    // res.json({ databata });

    const data = await QRController.qrGenarator(url);
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
