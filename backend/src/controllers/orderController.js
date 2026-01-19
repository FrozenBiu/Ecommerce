import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice, user } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  } else {
    const order = new Order({
      user, // ID của user
      orderItems,
      shippingAddress,
      totalPrice,
      status: "Pending",
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

export const getOrderByUser = async (req, res) => {
  const orders = await Order.find({ user: req.params.userId });
  res.json(orders);
};
