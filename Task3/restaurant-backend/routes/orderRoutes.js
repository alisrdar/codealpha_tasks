import express from "express";

const orderRouter = express.Router();

import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controllers/orderController.js";

orderRouter.get("/", getAllOrders);

orderRouter.get("/:id", getOrderById);

orderRouter.post("/", createOrder);

orderRouter.put("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
