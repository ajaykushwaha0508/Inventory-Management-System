import Category from "../models/category.model.js";

export const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

export const findAllCategories = async () => {
  return await Category.find().sort({ name: 1 });
};

export const findCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

export const findCategoryByName = async (name) => {
  return await Category.findOne({
    name: name.toLowerCase(),
  });
};

export const updateCategory = async (categoryId, categoryData) => {
  return await Category.findByIdAndUpdate(categoryId, categoryData, {
    new: true,
    runValidators: true,
  });
};

export const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};
