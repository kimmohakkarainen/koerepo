import axios from "axios";

const API_BASE_URL = "";

export const client = axios.create({
  baseURL: API_BASE_URL,
  maxRedirects: 0,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const excelClient = axios.create({
  baseURL: API_BASE_URL,
  responseType: "blob",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.ms-excel"
  }
});

/*
 * Check each response whether content-type is not JSON. This indicates that
 * session has timed out
 */
client.interceptors.response.use(function(response) {
  const type = response.headers["content-type"];
  const valid = /application\/json/.test(type);

  if (valid) {
    return response;
  } else {
    window.location.href = "/logout";
  }
});
