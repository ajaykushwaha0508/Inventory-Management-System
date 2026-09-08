import { axiosInstance } from "../lib/axiosClient";

export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/products", productData);

  return response.data;
};

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/products");

  return response.data;
};
