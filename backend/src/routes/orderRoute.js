import express from "express";
import { createOrder, getOrderByUser } from "../controllers/orderController.js";

const router = express.Router();

// Tạo đơn hàng mới
router.post("/", createOrder);

// Lấy danh sách đơn hàng của user
router.get("/myorders/:userId", getOrderByUser);

export default router;
