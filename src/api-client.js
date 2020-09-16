function client(query = null, { body, ...customConfig } = {}) {
  const baseApi = "https://api.thecatapi.com/v1/images/search";
  const endpoint = query ? baseApi + query : baseApi;
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return window.fetch(endpoint, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

function query(endpoint, body) {
  return client(`${endpoint}`, { body: body });
}
function create(endpoint, body) {
  return client(`${endpoint}`, { body: body });
}
function get() {
  return client();
}
function update(endpoint, body) {
  return client(`${endpoint}`, {
    method: "PUT",
    body: body
  });
}
function remove(endpoint, id) {
  return client(`${endpoint}/${id}`, { method: "DELETE" });
}
export { create, get, remove, update, query };
