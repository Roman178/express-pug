const form = document.querySelector("form");
const ticker = document.querySelector("#ticker");
const nameCurrency = document.querySelector("#name-currency");

const currencyToUpdate = JSON.parse(localStorage.getItem("currencyToUpdate"));

ticker.value = currencyToUpdate.ticker;
nameCurrency.value = currencyToUpdate.currency;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedCurrency = {
    ...currencyToUpdate,
    ticker: ticker.value,
    currency: nameCurrency.value,
  };
  putCurrency(updatedCurrency);
  localStorage.removeItem("currencyToUpdate");
  return (document.location.href = `${document.location.origin}/home`);
});
