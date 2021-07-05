const h2 = document.createElement("h2");
h2.textContent = "HELLO FROM SCRIPTS!";
h2.classList.add("card-title");
document.body.prepend(h2);

async function getAllCurrency() {
  try {
    const allCurrency = await fetchData();
    console.log(allCurrency);
  } catch (error) {
    console.error(error.message);
  }
}

getAllCurrency();
