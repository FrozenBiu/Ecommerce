import express from "express";
import {
  addToCart,
  getCurrentCart,
  removeFromCart,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Middleware xác thực (giả sử bạn đã viết middleware protect)
// const { protect } = require('../middleware/authMiddleware');

// 1. Lấy giỏ hàng của User hiện tại
// GET /api/cart
router.get("/:userId", getCurrentCart);

// 2. Thêm sản phẩm vào giỏ (Add to Cart)
// POST /api/cart/add
router.post("/add", addToCart);

// 3. Chỉnh sửa số lượng sản phẩm trong giỏ hàng
// PUT /api/cart/update
router.put("/update", updateCart);

// 4. Xóa sản phẩm khỏi giỏ
// DELETE /api/cart/remove
router.delete("/remove", removeFromCart);

export default router;
