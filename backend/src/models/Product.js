import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true }, // ảnh chính
    images: [{ type: String }], // ảnh phụ
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    status: { type: String, default: "" },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
