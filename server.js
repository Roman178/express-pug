const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/api", (req, res) => {
  const data = require("./db.json");
  res.status(200).send(data);
});

app.post("/api", (req, res) => {
  console.log(req.body);
  res.json({ ...req.body, server: "hello from server" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
