const express = require("express");
require("dotenv").config();

const app = express();

const indexRouter = require("./routes");

app.use(express.json()); // to use req.body IMP: THIS SHOULD ALWAYS BE ABOVE app.use("/", indexRouter);

app.use("/", indexRouter);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

//middleware
app.use((err, req, res, next) => {
  console.error(err);
  //   res.status(500).json({ msg: "Sth went wrong..." });
  res.status(500).json({ msg: err.toString() || "sth went wrong" });
});

app.listen(3232, () => {
  console.log("app is listening on port: 3232");
});
