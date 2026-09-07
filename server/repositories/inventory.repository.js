import InventoryTransaction from "../models/inventoryTransaction.model.js";

export const createInventoryTransaction = async (transactionData) => {
  return await InventoryTransaction.create(transactionData);
};

export const findTransactionsByProduct = async (productId) => {
  return await InventoryTransaction.find({
    product: productId,
  })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
};
