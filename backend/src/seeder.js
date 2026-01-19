import dotenv from "dotenv";
import Product from "./models/Product.js"; // Đảm bảo đường dẫn đúng tới Model Product
import connectDB from "./libs/db.js"; // Đảm bảo đường dẫn đúng tới file connect DB

dotenv.config();
connectDB();

// Dữ liệu mẫu để random
const categories = [
  {
    name: "Quần áo",
    items: [
      "Áo Thun",
      "Áo Sơ Mi",
      "Áo Hoodie",
      "Quần Jeans",
      "Quần Short",
      "Chân Váy",
      "Đầm Dạ Hội",
      "Áo Khoác Bomber",
    ],
  },
  {
    name: "Giày dép",
    items: [
      "Giày Sneaker",
      "Giày Tây",
      "Giày Cao Gót",
      "Sandal",
      "Boots Cao Cổ",
      "Dép Slide",
    ],
  },
  {
    name: "Phụ kiện",
    items: [
      "Mũ Lưỡi Trai",
      "Kính Mát",
      "Thắt Lưng Da",
      "Túi Tote",
      "Đồng Hồ",
      "Vòng Tay",
    ],
  },
];

const adjectives = [
  "Hàn Quốc",
  "Cao Cấp",
  "Vintage",
  "Retro",
  "Basic",
  "Streetwear",
  "Mùa Hè",
  "Limited Edition",
  "Form Rộng",
];

const importData = async () => {
  try {
    // 1. Xóa sạch dữ liệu cũ (để tránh trùng lặp khi chạy lại)
    await Product.deleteMany();
    console.log("Đã xóa dữ liệu cũ...");

    const products = [];

    // 2. Vòng lặp tạo 100 sản phẩm
    for (let i = 1; i <= 100; i++) {
      // Random Category
      const randomCat =
        categories[Math.floor(Math.random() * categories.length)];

      // Random Tên sản phẩm (Ví dụ: Áo Thun Vintage)
      const randomItem =
        randomCat.items[Math.floor(Math.random() * randomCat.items.length)];
      const randomAdj =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const productName = `${randomItem} ${randomAdj} - Mã ${i}`;

      // Random Giá (Từ 100k đến 2 triệu, làm tròn số đẹp)
      const randomPrice = Math.floor(Math.random() * 20 + 1) * 100000;

      // Link ảnh giả lập (có hiện tên sản phẩm trên ảnh)
      // Dùng dịch vụ placehold.co cho ổn định
      const randomImage = `https://placehold.co/600x400?text=${encodeURIComponent(randomItem)}`;

      products.push({
        name: productName,
        image: randomImage,
        description: `Mô tả chi tiết cho sản phẩm ${productName}. Chất liệu cao cấp, thoáng mát, phù hợp với nhiều phong cách thời trang hiện đại.`,
        category: randomCat.name, // "Quần áo" hoặc "Giày dép"...
        price: randomPrice,
        countInStock: Math.floor(Math.random() * 50), // Random kho từ 0 - 50
      });
    }

    // 3. Insert vào Database
    await Product.insertMany(products);

    console.log("✅ Đã tạo thành công 100 sản phẩm mẫu!");
    process.exit();
  } catch (error) {
    console.error(`❌ Lỗi: ${error.message}`);
    process.exit(1);
  }
};

// Hàm xóa dữ liệu nếu cần (chạy lệnh: node seeder.js -d)
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("🟥 Đã xóa toàn bộ sản phẩm!");
    process.exit();
  } catch (error) {
    console.error(`❌ Lỗi: ${error.message}`);
    process.exit(1);
  }
};

// Kiểm tra tham số dòng lệnh
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
