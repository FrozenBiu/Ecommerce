import express from "express";
import {
  getProducts,
  productDetails,
} from "../controllers/productController.js";

const router = express.Router();

// GET /api/products
// Xử lý: Tìm kiếm, Lọc Category/Giá, Phân trang
router.get("/", getProducts);

// GET /api/products/:id (Chi tiết sản phẩm)
router.get("/:id", productDetails);

export default router;
