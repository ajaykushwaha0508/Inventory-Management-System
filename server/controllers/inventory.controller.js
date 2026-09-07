import { stockSchema } from "../validatorsSchema/inventory.validator.js";

import {
  increaseStockService,
  decreaseStockService,
  getStockHistoryService,
} from "../services/inventory.service.js";

export const increaseStock = async (req, res) => {
  try {
    const result = stockSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const product = await increaseStockService({
      productId: req.params.id,
      quantity: result.data.quantity,
      note: result.data.note,
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Stock increased successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const decreaseStock = async (req, res) => {
  try {
    const result = stockSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const product = await decreaseStockService({
      productId: req.params.id,
      quantity: result.data.quantity,
      note: result.data.note,
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Stock decreased successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStockHistory = async (req, res) => {
  try {
    const history = await getStockHistoryService(req.params.id);

    return res.status(200).json({
      success: true,
      data: {
        history,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
