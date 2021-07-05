const h2 = document.createElement("h2");
h2.textContent = "HELLO FROM SCRIPTS!";
h2.classList.add("card-title");
document.body.prepend(h2);

async function getCurrency() {
  const allCurrency = await fetchData();
}
