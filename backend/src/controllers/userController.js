import User from "../models/User.js";
import bcrypt from "bcrypt";

export const authMe = async (req, res) => {
  try {
    const user = req.user; // lấy từ middleware

    res.status(200).json({ user });
  } catch (error) {
    console.error("Lỗi khi gọi authMe", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateInformation = async (req, res) => {
  try {
    const { username, fullName, currentPassword, newPassword } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(currentPassword, user.hashedPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu hiện tại không đúng",
      });
    }

    // hash password mới
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // update
    await User.findOneAndUpdate(
      { username },
      { fullName, hashedPassword: newHashedPassword },
    );

    return res.json({ message: "Update information success" });
  } catch (error) {
    console.error("Lỗi khi gọi updateInformation", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
