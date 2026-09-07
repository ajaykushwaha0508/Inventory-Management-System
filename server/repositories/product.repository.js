import Product from "../models/product.model.js";

export const createProduct = async (productData) => {
  return await Product.create(productData);
};

export const findAllProducts = async ({
  filter = {},
  sort = { createdAt: -1 },
  skip = 0,
  limit = 10,
}) => {
  return await Product.find(filter)
    .populate("category", "name description")
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

export const countProducts = async (filter = {}) => {
  return await Product.countDocuments(filter);
};

export const findProductById = async (productId) => {
  return await Product.findById(productId).populate(
    "category",
    "name description",
  );
};

export const findProductBySku = async (sku) => {
  return await Product.findOne({ sku });
};

export const updateProduct = async (productId, productData) => {
  return await Product.findByIdAndUpdate(productId, productData, {
    new: true,
    runValidators: true,
  }).populate("category", "name description");
};

export const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

export const updateProductQuantity = async (productId, quantity, status) => {
  return await Product.findByIdAndUpdate(
    productId,
    {
      quantity,
      status,
    },
    {
      new: true,
      runValidators: true,
    },
  ).populate("category", "name description");
};
