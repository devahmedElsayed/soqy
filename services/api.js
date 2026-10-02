import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data.products;
};

export default api;