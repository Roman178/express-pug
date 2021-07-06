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

// Не совсем хорошее решение. Надо исправить.
app.get("/home", function (req, res) {
  res.render("home");
});
app.get("/add", function (req, res) {
  res.render("add");
});
app.get("/edit", function (req, res) {
  res.render("edit");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
