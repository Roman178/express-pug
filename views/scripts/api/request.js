async function fetchData(method = "GET", body = null, headers = {}) {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers = {
        "Content-Type": "application/json",
      };
    }

    let data = [];
    if (method === "GET" || method === "POST") {
      const res = await fetch("/api/currency", { method, headers, body });
      if (!res.ok) throw new Error(data.message || "Что-то пошло не так");
      if (res.status === 204)
        return { message: "Нет сохраненных валют. Добавьте новую валюту." };

      data = await res.json();
    }

    if (method === "DELETE" || method === "PUT") {
      const res = await fetch(`/api/currency/${body.id}`, {
        method,
        headers,
        body,
      });
      if (!res.ok) throw new Error(data.message || "Что-то пошло не так");

      data = await res.json();
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllCurrency() {
  try {
    const allCurrency = await fetchData();
    return allCurrency;
  } catch (error) {
    throw new Error(error);
  }
}

async function postCurrency(currencyToPost) {
  try {
    const postedCurrency = await fetchData("POST", currencyToPost);
    console.log(postedCurrency);
    return postedCurrency;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteCurrency(currencyToDelete) {
  try {
    const data = await fetchData("DELETE", currencyToDelete);
    console.log(data);
  } catch (error) {
    throw new Error(error);
  }
}

async function putCurrency(currencyToUpdate) {
  try {
    const data = await fetchData("PUT", currencyToUpdate);
    console.log(data);
  } catch (error) {
    throw new Error(error);
  }
}
