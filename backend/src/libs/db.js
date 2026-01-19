import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Kết nối thành công với CSDL!");
  } catch (error) {
    console.error("Lỗi xảy ra khi kết nối đến CSDL!");
  }
};

export default connectDB;
