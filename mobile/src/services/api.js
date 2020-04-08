import { create } from "axios";

const api = create({
  baseURL: "http://192.168.43.99:3333",
});

export default api;
