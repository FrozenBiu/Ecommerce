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
      query.category = { $regex: req.query.category, $options: "i" };
    }

    // Lọc theo Status
    if (req.query.status) {
      query.status = { $regex: req.query.status, $options: "i" };
    }

    // Lọc theo khoảng giá (Price Range)
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // --- 3. Xử lý Sắp xếp (Mới thêm vào) ---
    let sortOption = { createdAt: -1 }; // Mặc định: Mới nhất (Giảm dần theo thời gian)

    if (req.query.sort) {
      switch (req.query.sort) {
        case "price-asc":
          sortOption = { price: 1 }; // Giá: Thấp -> Cao
          break;
        case "price-desc":
          sortOption = { price: -1 }; // Giá: Cao -> Thấp
          break;
        case "oldest":
          sortOption = { createdAt: 1 }; // Cũ nhất trước
          break;
        case "newest":
          sortOption = { createdAt: -1 }; // Mới nhất trước
          break;
        case "a-z":
          sortOption = { name: 1 }; // Tên A->Z
          break;
        case "z-a":
          sortOption = { name: -1 }; // Tên Z->A
          break;
        default:
          sortOption = { createdAt: -1 }; // Mặc định
      }
    }

    // Đếm tổng số lượng (để tính số trang)
    const count = await Product.countDocuments(query);

    // 3. Query database với Pagination
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, totalPages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const productDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
};
