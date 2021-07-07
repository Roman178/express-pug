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

      if (!res.ok) {
        const errors = await res.json();
        if (errors.errors) {
          return errors;
        }
      }
      if (res.status === 204)
        return {
          message: "There are no saved currencies. Add a new currency.",
        };

      data = await res.json();
    }

    if (method === "DELETE" || method === "PUT") {
      const res = await fetch(`/api/currency/${body.id}`, {
        method,
        headers,
        body,
      });
      if (!res.ok) {
        const errors = await res.json();
        if (errors.errors) {
          return errors;
        }
      }

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
    const result = await fetchData("POST", currencyToPost);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteCurrency(currencyToDelete) {
  try {
    const data = await fetchData("DELETE", currencyToDelete);
  } catch (error) {
    throw new Error(error);
  }
}

async function putCurrency(currencyToUpdate) {
  try {
    const result = await fetchData("PUT", currencyToUpdate);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

function handleErrors(err) {
  const toast = document.createElement("p");
  toast.classList.add("my-toast");
  toast.textContent = err.msg;
  setTimeout(() => toast.remove(), 3500);
  return document.body.prepend(toast);
}
