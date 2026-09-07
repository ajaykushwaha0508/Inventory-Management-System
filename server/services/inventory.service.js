import {
  findProductById,
  updateProductQuantity,
} from "../repositories/product.repository.js";

import {
  createInventoryTransaction,
  findTransactionsByProduct,
} from "../repositories/inventory.repository.js";

const getProductStatus = (quantity) => {
  if (quantity === 0) {
    return "OUT_OF_STOCK";
  }

  if (quantity <= 10) {
    return "LOW_STOCK";
  }

  return "IN_STOCK";
};

export const increaseStockService = async ({
  productId,
  quantity,
  note,
  userId,
}) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const previousQuantity = product.quantity;

  const newQuantity = previousQuantity + quantity;

  const status = getProductStatus(newQuantity);

  const updatedProduct = await updateProductQuantity(
    productId,
    newQuantity,
    status,
  );

  await createInventoryTransaction({
    product: productId,
    type: "IN",
    quantity,
    previousQuantity,
    newQuantity,
    note,
    createdBy: userId,
  });

  return updatedProduct;
};

export const decreaseStockService = async ({
  productId,
  quantity,
  note,
  userId,
}) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const previousQuantity = product.quantity;

  if (quantity > previousQuantity) {
    throw new Error("Insufficient stock. Stock cannot become negative");
  }

  const newQuantity = previousQuantity - quantity;

  const status = getProductStatus(newQuantity);

  const updatedProduct = await updateProductQuantity(
    productId,
    newQuantity,
    status,
  );

  await createInventoryTransaction({
    product: productId,
    type: "OUT",
    quantity,
    previousQuantity,
    newQuantity,
    note,
    createdBy: userId,
  });

  return updatedProduct;
};

export const getStockHistoryService = async (productId) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return await findTransactionsByProduct(productId);
};
