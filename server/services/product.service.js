import {
  createProduct,
  findAllProducts,
  countProducts,
  findProductById,
  findProductBySku,
  updateProduct,
  deleteProduct,
} from "../repositories/product.repository.js";

import Category from "../models/category.model.js";

const getProductStatus = (quantity) => {
  if (quantity === 0) {
    return "OUT_OF_STOCK";
  }

  if (quantity <= 10) {
    return "LOW_STOCK";
  }

  return "IN_STOCK";
};

export const createProductService = async (productData) => {
  const {
    name,
    sku,
    category,
    description,
    quantity,
    unitPrice,
    supplierName,
  } = productData;

  const existingSku = await findProductBySku(sku);

  if (existingSku) {
    throw new Error("Product with this SKU already exists");
  }

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    throw new Error("Category not found");
  }

  const status = getProductStatus(quantity);

  return await createProduct({
    name,
    sku,
    category,
    description,
    quantity,
    unitPrice,
    supplierName,
    status,
  });
};

export const getProductsService = async ({
  search,
  category,
  status,
  sortBy,
  sortOrder,
  page,
  limit,
}) => {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        sku: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (status) {
    filter.status = status;
  }

  const allowedSortFields = ["name", "quantity", "unitPrice", "createdAt"];

  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  const sort = {
    [sortField]: sortDirection,
  };

  const [products, total] = await Promise.all([
    findAllProducts({
      filter,
      sort,
      skip,
      limit,
    }),
    countProducts(filter),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductByIdService = async (productId) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateProductService = async (productId, productData) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (productData.sku) {
    const existingSku = await findProductBySku(productData.sku);

    if (existingSku && existingSku._id.toString() !== productId) {
      throw new Error("Product with this SKU already exists");
    }
  }

  if (productData.category) {
    const categoryExists = await Category.findById(productData.category);

    if (!categoryExists) {
      throw new Error("Category not found");
    }
  }

  const newQuantity =
    productData.quantity !== undefined
      ? productData.quantity
      : product.quantity;

  productData.status = getProductStatus(newQuantity);

  return await updateProduct(productId, productData);
};

export const deleteProductService = async (productId) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  await deleteProduct(productId);
};
