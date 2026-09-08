import { axiosInstance } from "../lib/axiosClient";

export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/products", productData);

  return response.data;
};

export const fetchProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", {
    params,
  });

  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await axiosInstance.put(
    `/products/${productId}`,
    productData,
  );

  return response.data;
};
