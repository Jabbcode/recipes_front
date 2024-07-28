import axios from "axios";

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

export default instanceAxios;