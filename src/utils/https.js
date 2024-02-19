import axios from "axios";

const request = axios.create({
  // baseURL: "http://47.95.13.131:8080/",
  timeout: 5000,
});
request.defaults.withCredentials = true;
request.interceptors.request.use((config) => {
  config.headers.set("Token", window.sessionStorage.getItem("Token"));
  return config;
});
export default request;
