const form = document.querySelector("form");
const ticker = document.querySelector("#ticker");
const nameCurrency = document.querySelector("#name-currency");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    ticker: ticker.value.toUpperCase(),
    currency: nameCurrency.value,
  };

  const result = await postCurrency(data);
  if (result.errors) {
    const { errors } = result;
    errors.forEach((e) => {
      handleErrors(e);
    });
    throw new Error(errors.map((e) => e.msg).join(" "));
  }

  return (document.location.href = `${document.location.origin}/home`);
});
