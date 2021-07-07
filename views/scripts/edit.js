const form = document.querySelector("form");
const ticker = document.querySelector("#ticker");
const nameCurrency = document.querySelector("#name-currency");

const currencyToUpdate = JSON.parse(localStorage.getItem("currencyToUpdate"));

ticker.value = currencyToUpdate.ticker;
nameCurrency.value = currencyToUpdate.currency;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedCurrency = {
    ...currencyToUpdate,
    ticker: ticker.value.toUpperCase(),
    currency: nameCurrency.value,
  };
  const result = await putCurrency(updatedCurrency);
  if (result.errors) {
    const { errors } = result;
    errors.forEach((e) => {
      handleErrors(e);
    });
    throw new Error(errors.map((e) => e.msg).join(" "));
  }

  localStorage.removeItem("currencyToUpdate");
  return (document.location.href = `${document.location.origin}/home`);
});
