async function fetchData(method = "GET", body = null, headers = {}) {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      };
    }

    const res = await fetch("/api/currency", { method, headers, body });
    if (res.status === 204) throw new Error("Нет сохраненных валют.");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Что-то пошло не так");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function getAllCurrency() {
  try {
    const allCurrency = await fetchData();
    return allCurrency;
  } catch (error) {
    console.error(error.message);
  }
}

async function postCurrency() {
  try {
    const postedCurrency = await fetchData("POST", { test: 3, kol: "pop" });
    console.log(postedCurrency);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteCurrency(currencyToDelete) {
  try {
  } catch (error) {
    throw new Error(error);
  }
}
