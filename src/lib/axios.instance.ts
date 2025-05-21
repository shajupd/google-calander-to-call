import axios from "axios";

const appApi = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default appApi;
