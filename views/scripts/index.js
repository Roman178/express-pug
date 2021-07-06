const h2 = document.createElement("h2");
h2.textContent = "HELLO FROM SCRIPTS!";
h2.classList.add("card-title");
document.body.prepend(h2);

function createCardCurrency(data) {
  const card = document.createElement("div");
  const ticker = document.createElement("h3");
  const nameCurrency = document.createElement("h4");
  const idCurrency = document.createElement("span");
  const btnDelete = document.createElement("button");
  const btnEdit = document.createElement("button");

  card.classList.add(
    "my-card",
    "container",
    "d-flex",
    "align-items-center",
    "justify-content-between",
    "border"
  );

  ticker.classList.add("h3", "ticker");
  ticker.textContent = data.ticker;

  nameCurrency.classList.add("h4", "name-currency");
  nameCurrency.textContent = data.currency;

  idCurrency.classList.add("id-currency");
  idCurrency.textContent = data.id;

  btnEdit.classList.add("btn-warning");
  btnEdit.textContent = "Edit";

  btnDelete.classList.add("btn-danger");
  btnDelete.textContent = "Delete";

  [ticker, nameCurrency, idCurrency, btnEdit, btnDelete].forEach((item) => {
    card.appendChild(item);
  });

  return card;
}

async function createListCurrency() {
  const arrCurrency = await getAllCurrency();
  arrCurrency.forEach(function (item) {
    const newCard = createCardCurrency(item);
    document.querySelector("script").before(newCard);
  });
}

createListCurrency().then(() => {
  const buttonsDelete = document.querySelectorAll(".btn-danger");

  btnDelete.addEventListener("click", () => console.log("HIII"));
});
