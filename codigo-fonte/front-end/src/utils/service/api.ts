import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3030", //"https://pmv-ads-2024-1-e5-proj-empext-t2-sistema.onrender.com",
});
