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

  btnEditAnchor.setAttribute("href", "edit");
  btnEditAnchor.classList.add("my-anchor");
  btnEditAnchor.textContent = "Edit";

  btnEdit.appendChild(btnEditAnchor);
  btnEdit.classList.add("btn-warning", "flex-grow-1", "p-0");
  btnEdit.addEventListener("click", () => {
    localStorage.setItem("currencyToUpdate", JSON.stringify(data));
  });

  btnDelete.classList.add("btn-danger", "flex-grow-1", "p-0");
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
  if (arrCurrency.message) {
    const blockEmptyList = document.createElement("h4");
    blockEmptyList.classList.add("block-empty-list");
    blockEmptyList.textContent = arrCurrency.message;

    const addBtn = document.querySelector("button");
    return addBtn.after(blockEmptyList);
  }
  arrCurrency.forEach(function (item) {
    const newCard = createCardCurrency(item);
    document.querySelector("script").before(newCard);
  });
}

createListCurrency();

function searcher(inputSelectorWithValue, iterableSelector) {
  const inputText = document.querySelector(inputSelectorWithValue).value;
  const cards = document.querySelectorAll(".my-card");
  if (cards.length === 0) return;

  const nodeEls = document.querySelectorAll(iterableSelector);
  const nodeElsArr = Array.from(nodeEls);
  const texts = nodeElsArr.map((nodeEl) => nodeEl.textContent);
  const foundTexts = texts.filter(
    (text) => text.toUpperCase() === inputText.toUpperCase()
  );
  if (foundTexts.length === 0) return;

  nodeEls.forEach((el) => {
    if (el.textContent.toUpperCase() !== inputText.toUpperCase()) {
      return el.closest(".my-card").remove();
    }
    return;
  });
}

const btnSearchTicker = document.querySelector("#my-ticker-searcher-btn");
const btnSearchCurrency = document.querySelector("#my-currency-searcher-btn");
const inputSearchTicker = document.querySelector("#my-ticker-searcher-input");
const inputSearchCurrency = document.querySelector(
  "#my-currency-searcher-input"
);

btnSearchTicker.addEventListener("click", () =>
  searcher("#my-ticker-searcher-input", ".ticker")
);
btnSearchCurrency.addEventListener("click", () => {
  searcher("#my-currency-searcher-input", ".name-currency");
});
inputSearchTicker.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    searcher("#my-ticker-searcher-input", ".ticker");
  }
});
inputSearchCurrency.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    searcher("#my-currency-searcher-input", ".name-currency");
  }
});
