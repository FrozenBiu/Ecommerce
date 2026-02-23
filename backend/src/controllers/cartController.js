import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCurrentCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (cart) {
      res.json(cart);
    } else {
      // Nếu chưa có giỏ hàng, trả về mảng rỗng thay vì lỗi 404
      res.json({ items: [], totalPrice: 0 });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, qty } = req.body;

  try {
    // Lấy thông tin sản phẩm từ DB để đảm bảo giá chính xác (bảo mật)
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // --- Trường hợp 1: Giỏ hàng đã tồn tại ---

      // Kiểm tra xem sản phẩm này đã có trong giỏ chưa
      const itemIndex = cart.items.findIndex(
        (p) => p.product.toString() === productId,
      );

      if (itemIndex > -1) {
        // Nếu có rồi -> cập nhật số lượng
        cart.items[itemIndex].qty += qty;
      } else {
        // Nếu chưa có -> push vào mảng items
        cart.items.push({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty: qty,
        });
      }
    } else {
      // --- Trường hợp 2: User chưa có giỏ hàng -> Tạo mới ---
      cart = new Cart({
        user: userId,
        items: [
          {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            qty: qty,
          },
        ],
      });
    }

    await cart.save(); // Middleware pre-save sẽ tự tính totalPrice
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateCart = async (req, res) => {
  const { userId, productId, qty } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Tìm vị trí sản phẩm trong mảng items
    const itemIndex = cart.items.findIndex(
      (p) => p.product.toString() === productId,
    );

    if (itemIndex > -1) {
      // Nếu qty > 0 thì cập nhật, nếu <= 0 thì xóa luôn sản phẩm đó
      if (qty > 0) {
        cart.items[itemIndex].qty = qty;
      } else {
        // Xóa sản phẩm khỏi mảng nếu số lượng về 0
        cart.items.splice(itemIndex, 1);
      }

      // Lưu lại (Middleware pre-save sẽ tự tính lại totalPrice)
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      // Lọc bỏ sản phẩm cần xóa
      cart.items = cart.items.filter(
        (item) => item.product?.toString() !== productId,
      );
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const removeAllFromCart = async (req, res) => {
  const { userId } = req.body;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      // Lọc bỏ sản phẩm cần xóa
      cart.items = [];
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
