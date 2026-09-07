import {
  createCategory,
  findAllCategories,
  findCategoryById,
  findCategoryByName,
  updateCategory,
  deleteCategory,
} from "../repositories/category.repository.js";

export const createCategoryService = async ({ name, description }) => {
  const normalizedName = name.trim().toLowerCase();

  const existingCategory = await findCategoryByName(normalizedName);

  if (existingCategory) {
    throw new Error("Category with this name already exists");
  }

  return await createCategory({
    name: normalizedName,
    description: description?.trim() || "",
  });
};

export const getAllCategoriesService = async () => {
  return await findAllCategories();
};

export const getCategoryByIdService = async (categoryId) => {
  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategoryService = async (categoryId, categoryData) => {
  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  if (categoryData.name) {
    const normalizedName = categoryData.name.trim().toLowerCase();

    const existingCategory = await findCategoryByName(normalizedName);

    if (existingCategory && existingCategory._id.toString() !== categoryId) {
      throw new Error("Category with this name already exists");
    }

    categoryData.name = normalizedName;
  }

  return await updateCategory(categoryId, categoryData);
};

export const deleteCategoryService = async (categoryId) => {
  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  await deleteCategory(categoryId);
};
