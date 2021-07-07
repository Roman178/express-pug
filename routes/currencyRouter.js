const fs = require("fs");
const express = require("express");
const { check, validationResult } = require("express-validator");

const validation = [
  check(
    "ticker",
    "The length of the ticker should be from 3 to 5 characters."
  ).isLength({ min: 3, max: 5 }),
  check("ticker", "The ticker cannot be an empty field.").exists({
    checkFalsy: true,
  }),
  check("currency", "The name of currency cannot be an empty field.").exists({
    checkFalsy: true,
  }),
  check(
    "currency",
    "The length of the currency name cannot be more than 20 characters."
  ).isLength({ max: 20 }),
];

function routes() {
  const currencyRouter = express.Router();

  currencyRouter
    .route("/currency")
    .get((req, res) => {
      const data = JSON.parse(fs.readFileSync("./db/db.json"));
      // const data = [];
      if (data.length === 0) {
        return res.sendStatus(204);
      }
      if (data.length) {
        return res.status(200).json(data);
      }
    })
    .post(validation, (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.errors,
        });
      }

      const listCurrency = JSON.parse(fs.readFileSync("./db/db.json"));
      const allIdArr = listCurrency.map((item) => item.id);
      const newId = allIdArr.length !== 0 ? Math.max(...allIdArr) + 1 : 1;
      const newCurrency = { id: newId, ...req.body };
      listCurrency.push(newCurrency);
      fs.writeFileSync("./db/db.json", JSON.stringify(listCurrency));

      return res.json(newCurrency);
    });

  currencyRouter
    .route("/currency/:id")
    .put(validation, (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.errors,
        });
      }

      const currencyToUpdate = req.body;
      const listCurrency = JSON.parse(fs.readFileSync("./db/db.json"));
      const foundCurrency = listCurrency.find(
        (item) => item.id === currencyToUpdate.id
      );
      if (!foundCurrency) {
        return res.status(404).json({ message: "Ошибка. Валюта не найдена." });
      }
      const updListCurrency = listCurrency.map((item) => {
        if (item.id === currencyToUpdate.id) return currencyToUpdate;
        return item;
      });
      fs.writeFileSync("./db/db.json", JSON.stringify(updListCurrency));

      return res.json(foundCurrency);
    })
    .delete((req, res) => {
      const currencyToDelete = req.body;
      const listCurrency = JSON.parse(fs.readFileSync("./db/db.json"));
      const foundCurrency = listCurrency.find(
        (item) => item.id === currencyToDelete.id
      );
      if (!foundCurrency) {
        return res.status(404).json({ message: "Ошибка. Валюта не найдена." });
      }
      const updListCurrency = listCurrency.filter(
        (item) => item.id !== currencyToDelete.id
      );
      fs.writeFileSync("./db/db.json", JSON.stringify(updListCurrency));

      return res.json(foundCurrency);
    });

  return currencyRouter;
}

module.exports = routes;
