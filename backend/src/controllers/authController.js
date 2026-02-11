import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export const signUp = async (req, res) => {
  try {
    // lấy thông tin người dùng nhập
    const { fullName, username, password } = req.body;

    if (!fullName || !username || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // kiểm tra xem username có tồn tại hay chưa, nếu có thì return đã tồn tại
    const duplicateUsername = await User.findOne({ username });

    if (duplicateUsername) {
      res.status(400).json({ message: "Người dùng đã tồn tại" });
    }

    // tạo hashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);

    // tạo 1 user mới với thông tin người dùng nhập và mật khẩu hash
    await User.create({
      fullName,
      username,
      hashedPassword,
    });

    // return success message
    res.sendStatus(201);
  } catch (error) {
    console.error("Lỗi xảy ra khi gọi signUp", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin." });
    }

    // tìm user trong database
    const user = await User.findOne({ username });

    if (!user) {
      res
        .status(400)
        .json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác." });
    }

    // kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Tên đăng nhập hoặc mật khẩu không chính xác." });
    }

    // tạo access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // trả refreshToken về trong Session
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // trả refreshToken về trong cookie cho client
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_TTL,
      secure: true,
      sameSite: "none",
    });

    // return
    res.status(200).json({ message: "Login thành công", accessToken });
  } catch (error) {
    console.error("Lỗi xảy ra khi gọi signIn", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signOut = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    // xoá refresh token trong Session
    await Session.deleteOne({ refreshToken });

    // xoá refresh token trong cookie
    res.clearCookie("refreshToken");

    res.sendStatus(201);
  } catch (error) {
    console.error("Lỗi khi gọi signOut", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // lấy refresh token trong cookie
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Token không tồn tại" });
    }

    // lấy refresh token trong db
    const session = await Session.findOne({ refreshToken });

    if (!session) {
      return res
        .status(403)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    // kiểm tra xem token còn hạn không
    if (session.expiresAt < new Date()) {
      return res.status(403).json({ message: "Token đã hết hạn" });
    }

    // nếu hợp lệ thì lấy refresh token trong session để tạo access token mới
    const accessToken = jwt.sign(
      { userId: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // return
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi refreshToken", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
