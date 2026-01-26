import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const pageSize = 8; // Số sản phẩm mỗi trang
    const page = Number(req.query.pageNumber) || 1;

    // 1. Xử lý Tìm kiếm (Search) theo tên
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    // 2. Xử lý Lọc (Filter)
    // Tạo object query kết hợp keyword
    let query = { ...keyword };

    // Lọc theo Category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Lọc theo khoảng giá (Price Range)
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Đếm tổng số lượng (để tính số trang)
    const count = await Product.countDocuments(query);

    // 3. Query database với Pagination
    const products = await Product.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 }); // Mới nhất lên đầu

    res.json({ products, page, totalPages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const productDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
