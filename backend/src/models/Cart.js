import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String, // Lưu tên để hiển thị nhanh đỡ phải populate
        image: String, // Lưu ảnh
        price: Number, // Lưu giá tại thời điểm thêm vào giỏ
        qty: { type: Number, default: 1 },
      },
    ],
    // Tổng tiền có thể tính toán mỗi khi query, hoặc lưu cứng vào đây
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Middleware tính lại tổng tiền trước khi lưu (Optional nhưng tiện)
cartSchema.pre("save", function () {
  this.totalPrice = this.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
