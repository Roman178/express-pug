const form = document.querySelector("form");
const ticker = document.querySelector("#ticker");
const nameCurrency = document.querySelector("#name-currency");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = { ticker: ticker.value, currency: nameCurrency.value };

  postCurrency(data);
  return (document.location.href = `${document.location.origin}/home`);
});
