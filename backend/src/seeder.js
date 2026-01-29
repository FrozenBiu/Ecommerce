import dotenv from "dotenv";
import axios from "axios";
import Product from "./models/Product.js";
import connectDB from "./libs/db.js";

dotenv.config();
connectDB();

const REQUESTS_PER_CATEGORY = 10; // Giảm xuống 10 trang để an toàn hơn
const PER_PAGE = 30;

// CẤU HÌNH TỪ KHÓA MỚI (Dùng mảng để random từ khóa mỗi lần gọi)
const categoriesConfig = {
  Clothing: {
    // Thay vì 1 chuỗi dài, ta dùng danh sách các từ khóa đơn giản
    queries: [
      "clothing",
      "fashion",
      "apparel",
      "outfit",
      "streetwear",
      "dress",
      "shirt",
    ],
    items: [
      "Oversized T-Shirt",
      "Vintage Hoodie",
      "Denim Jacket",
      "Cargo Pants",
      "Knitted Sweater",
      "Casual Blazer",
      "Floral Dress",
      "Trench Coat",
    ],
    images: [],
  },
  Shoes: {
    queries: ["shoes", "sneakers", "footwear", "boots", "sandals", "heels"],
    items: [
      "Chunky Sneakers",
      "Running Shoes",
      "Leather Boots",
      "Penny Loafers",
      "Summer Sandals",
      "High Heels",
    ],
    images: [],
  },
  Accessories: {
    queries: [
      "accessories",
      "watch",
      "jewelry",
      "handbag",
      "sunglasses",
      "backpack",
    ],
    items: [
      "Luxury Watch",
      "Aviator Sunglasses",
      "Leather Belt",
      "Canvas Backpack",
      "Tote Bag",
      "Leather Wallet",
    ],
    images: [],
  },
};

const adjectives = [
  "Premium",
  "Essential",
  "Vintage",
  "Modern",
  "Luxury",
  "Urban",
  "Minimalist",
  "Limited",
  "Elegant",
  "Streetwear",
];
const statuses = ["New", "Hot", "Sale", ""];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const fetchAllImages = async (categoryKey, queries) => {
  let collectedImages = [];
  console.log(`\n⬇️  Bắt đầu tải ảnh cho: ${categoryKey}`);

  for (let i = 0; i < REQUESTS_PER_CATEGORY; i++) {
    // Chọn ngẫu nhiên 1 từ khóa trong danh sách để tìm kiếm đa dạng hơn
    const randomQuery = queries[i % queries.length];

    try {
      process.stdout.write(
        `   ...Gọi API với từ khóa "${randomQuery}" (Page ${i + 1}) `,
      );

      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            client_id: process.env.UNSPLASH_ACCESS_KEY,
            query: randomQuery, // Dùng từ khóa ngắn
            per_page: PER_PAGE,
            page: Math.floor(i / queries.length) + 1, // Tự động tăng page nếu lặp lại từ khóa
            orientation: "squarish",
          },
        },
      );

      const newImages = response.data.results.map((img) => img.urls.regular);

      if (newImages.length === 0) {
        console.log("-> Hết ảnh.");
        continue; // Thử từ khóa khác
      }

      collectedImages = [...collectedImages, ...newImages];
      console.log(`-> OK (+${newImages.length} ảnh)`);

      await delay(1500); // Nghỉ 1.5s cho an toàn
    } catch (error) {
      console.log(`-> ❌ Lỗi: ${error.message}`);
      if (error.response && error.response.status === 403) {
        console.log("⚠️  Đã hết lượt gọi API!");
        break;
      }
    }
  }
  // Lọc trùng lặp ảnh (nếu có)
  collectedImages = [...new Set(collectedImages)];
  console.log(`✅ Tổng ${categoryKey}: ${collectedImages.length} ảnh.`);
  return collectedImages;
};

const importData = async () => {
  try {
    await Product.deleteMany();
    console.log("🧹 Đã xóa dữ liệu cũ...");

    for (const cat in categoriesConfig) {
      // Truyền mảng queries vào hàm fetch
      categoriesConfig[cat].images = await fetchAllImages(
        cat,
        categoriesConfig[cat].queries,
      );
    }

    const products = [];
    const catKeys = Object.keys(categoriesConfig);

    console.log("\n🔨 Đang tạo 100 sản phẩm...");

    for (let i = 1; i <= 100; i++) {
      const randomCatKey = catKeys[Math.floor(Math.random() * catKeys.length)];
      const catData = categoriesConfig[randomCatKey];

      const noun =
        catData.items[Math.floor(Math.random() * catData.items.length)];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];

      let selectedImages = [];

      if (catData.images.length >= 4) {
        const shuffled = shuffleArray(catData.images);
        selectedImages = shuffled.slice(0, 4);
      } else {
        // Fallback nếu vẫn thiếu ảnh
        for (let k = 0; k < 4; k++) {
          selectedImages.push(
            `https://placehold.co/600x600?text=${noun}+${k + 1}`,
          );
        }
      }

      const randomPrice = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      const productName = `${adj} ${noun} ${i}`;

      products.push({
        name: productName,
        image: selectedImages[0],
        images: selectedImages,
        description: `This ${productName} features a versatile design suitable for various occasions. Crafted with attention to detail.`,
        category: randomCatKey,
        price: randomPrice,
        countInStock: Math.floor(Math.random() * 50) + 1,
        status: randomStatus,
      });
    }

    await Product.insertMany(products);
    console.log("\n🎉 THÀNH CÔNG! Dữ liệu đã được nạp lại.");
    process.exit();
  } catch (error) {
    console.error(`❌ Fatal Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("🟥 Đã xóa toàn bộ sản phẩm!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
