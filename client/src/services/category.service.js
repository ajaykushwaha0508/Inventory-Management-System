import { axiosInstance } from "../lib/axiosClient";

export const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");

  return response.data;
};

export const createCategory = async ({ name, description }) => {
  const response = await axiosInstance.post("/categories", {
    name,
    description,
  });

  return response.data;
};

// Update category
export const updateCategory = async (categoryId, { name, description }) => {
  const response = await axiosInstance.put(`/categories/${categoryId}`, {
    name,
    description,
  });

  return response.data;
};
