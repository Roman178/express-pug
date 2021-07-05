async function fetchData(method = "GET", body = null, headers = {}) {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch("/api", { method, headers, body });
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
