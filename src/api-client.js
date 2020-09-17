function client(endpoint, { body, ...customConfig } = {}) {
  const baseApi = "https://api.thecatapi.com/v1";
  const fullUrl = baseApi + endpoint;
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "739648fb-084b-4ae2-b524-a2c872cc427b"
  };
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
  return window.fetch(fullUrl, config).then(async (response) => {
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
function get(endpoint) {
  return client(endpoint);
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
