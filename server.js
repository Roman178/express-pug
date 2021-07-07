const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/currencyRouter")();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.set("view engine", "pug");

app.get("/", function (req, res) {
  const listCurrency = JSON.parse(fs.readFileSync("./db/db.json"));
  return res.json(listCurrency);
});

app.get("/home", function (req, res) {
  return res.render("home");
});
app.get("/add", function (req, res) {
  return res.render("add");
});
app.get("/edit", function (req, res) {
  return res.render("edit");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
