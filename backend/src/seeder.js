import dotenv from "dotenv";
import Product from "./models/Product.js"; // Check đường dẫn này
import connectDB from "./libs/db.js"; // Check đường dẫn này
import axios from "axios"; // Nhớ cài axios: npm install axios

dotenv.config();
connectDB();

// Cấu hình danh mục và từ khóa tìm kiếm trên Unsplash
const categoriesConfig = {
  Clothing: {
    keywords: ["fashion clothing", "shirt", "dress", "men fashion"],
    items: [
      "T-Shirt",
      "Hoodie",
      "Jacket",
      "Jeans",
      "Sweater",
      "Blazer",
      "Dress",
      "Coat",
    ],
    images: [], // Sẽ chứa link ảnh thật từ Unsplash
  },
  Shoes: {
    keywords: ["sneakers", "shoes", "boots", "running shoes"],
    items: [
      "Sneakers",
      "Running Shoes",
      "Boots",
      "Loafers",
      "Sandals",
      "High Heels",
    ],
    images: [],
  },
  Accessories: {
    keywords: ["watch", "sunglasses", "handbag", "fashion accessories"],
    items: [
      "Watch",
      "Sunglasses",
      "Leather Belt",
      "Backpack",
      "Handbag",
      "Wallet",
    ],
    images: [],
  },
};

const adjectives = [
  "Premium",
  "Vintage",
  "Classic",
  "Urban",
  "Modern",
  "Luxury",
  "Casual",
  "Sporty",
];
const statuses = ["New", "Hot", "Sale", ""];

// Hàm lấy ảnh từ Unsplash (Gọi 1 lần lấy 30 ảnh)
const fetchUnsplashImages = async (query) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        client_id: process.env.UNSPLASH_ACCESS_KEY,
        query: query,
        per_page: 30, // Lấy 30 ảnh mỗi lần gọi
        orientation: "squarish", // Lấy ảnh vuông cho đẹp (hoặc 'landscape')
      },
    });
    // Chỉ lấy url loại 'regular' hoặc 'small'
    return response.data.results.map((img) => img.urls.regular);
  } catch (error) {
    console.error(`⚠️ Lỗi lấy ảnh cho query "${query}":`, error.message);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};

const importData = async () => {
  try {
    await Product.deleteMany();
    console.log("🧹 Đã xóa dữ liệu cũ...");

    console.log("⏳ Đang tải hình ảnh từ Unsplash (Vui lòng đợi 5-10s)...");

    // 1. Gọi API Unsplash cho từng danh mục TRƯỚC khi vào vòng lặp
    // (Cách này tiết kiệm request, chỉ tốn 3 requests thay vì 100)
    for (const cat in categoriesConfig) {
      const query = categoriesConfig[cat].keywords.join(" "); // Gộp keyword
      categoriesConfig[cat].images = await fetchUnsplashImages(query);
      console.log(
        `   + Đã tải ${categoriesConfig[cat].images.length} ảnh cho ${cat}`,
      );
    }

    const products = [];
    const catKeys = Object.keys(categoriesConfig);

    // 2. Tạo 100 sản phẩm
    for (let i = 1; i <= 100; i++) {
      // Random Category
      const randomCatKey = catKeys[Math.floor(Math.random() * catKeys.length)];
      const catData = categoriesConfig[randomCatKey];

      // Random Tên
      const noun =
        catData.items[Math.floor(Math.random() * catData.items.length)];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];

      // Lấy ảnh thật: Dùng thuật toán xoay vòng (modulo) để không bị hết ảnh
      // Nếu API lỗi không về ảnh thì dùng placeholder dự phòng
      let realImage = `https://placehold.co/600x600?text=${noun}`;
      if (catData.images.length > 0) {
        realImage = catData.images[i % catData.images.length];
      }

      const randomPrice = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      products.push({
        name: `${adj} ${noun}`,
        image: realImage,
        description: `Experience the best quality with our ${adj} ${noun}. Perfect for any occasion using Unsplash authentic imagery.`,
        category: randomCatKey,
        price: randomPrice,
        countInStock: Math.floor(Math.random() * 50) + 1,
        status: randomStatus,
      });
    }

    await Product.insertMany(products);
    console.log("✅ Đã tạo 100 sản phẩm với ảnh thật từ Unsplash!");
    process.exit();
  } catch (error) {
    console.error(`❌ Lỗi Seeder: ${error.message}`);
    process.exit(1);
  }
};

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

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
