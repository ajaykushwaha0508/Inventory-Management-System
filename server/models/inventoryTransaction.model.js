import mongoose from "mongoose";

const inventoryTransactionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },

    type: {
      type: String,
      enum: ["IN", "OUT"],
      required: [true, "Transaction type is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Transaction quantity is required"],
      min: [1, "Transaction quantity must be at least 1"],
    },

    previousQuantity: {
      type: Number,
      required: [true, "Previous quantity is required"],
      min: [0, "Previous quantity cannot be negative"],
    },

    newQuantity: {
      type: Number,
      required: [true, "New quantity is required"],
      min: [0, "New quantity cannot be negative"],
    },

    note: {
      type: String,
      trim: true,
      maxlength: [500, "Note cannot exceed 500 characters"],
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user is required"],
    },
  },
  {
    timestamps: true,
  },
);

inventoryTransactionSchema.index({
  product: 1,
});

inventoryTransactionSchema.index({
  createdBy: 1,
});

inventoryTransactionSchema.index({
  createdAt: -1,
});

const InventoryTransaction = mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema,
);

export default InventoryTransaction;
