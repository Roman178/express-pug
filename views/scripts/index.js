function createCardCurrency(data) {
  const card = document.createElement("div");
  const ticker = document.createElement("h3");
  const nameCurrency = document.createElement("h4");
  const idCurrency = document.createElement("span");
  const btnDelete = document.createElement("button");
  const btnEdit = document.createElement("button");
  const btnEditAnchor = document.createElement("a");

  card.classList.add(
    "my-card",
    "container",
    "d-flex",
    "align-items-center",
    "justify-content-between",
    "border"
  );

  ticker.classList.add("h3", "ticker", "flex-grow-1");
  ticker.textContent = data.ticker;

  nameCurrency.classList.add("h4", "name-currency", "w-25");
  nameCurrency.textContent = data.currency;

  idCurrency.classList.add("id-currency", "flex-grow-1");
  idCurrency.textContent = data.id;

  btnEditAnchor.setAttribute("href", "add");
  btnEditAnchor.classList.add("my-anchor");
  btnEditAnchor.textContent = "Edit";

  btnEdit.appendChild(btnEditAnchor);
  btnEdit.classList.add("btn-warning", "flex-grow-1");
  btnEdit.addEventListener("click", () => {
    localStorage.setItem("currencyToUpdate", JSON.stringify(data));
  });

  btnDelete.classList.add("btn-danger", "flex-grow-1");
  btnDelete.textContent = "Delete";
  btnDelete.addEventListener("click", () => {
    deleteCurrency(data);
    document.location.reload();
  });

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

createListCurrency();
