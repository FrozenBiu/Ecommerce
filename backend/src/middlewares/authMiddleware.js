import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoutes = async (req, res, next) => {
  try {
    // lấy access token trong headers
    const authHeaders = req.headers["authorization"];
    const token = authHeaders.split(" ")[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.error(err);

          return res
            .status(403)
            .json({ message: "Access token hết hạn hoặc không đúng" });
        }

        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword",
        );

        if (!user) {
          res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        req.user = user;

        next();
      },
    );
  } catch (error) {
    console.error("Lỗi khi xử lý JWT xác thực người dùng", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
