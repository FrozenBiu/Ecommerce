import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import connectDB from "./libs/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.MODE == "PRODUCTION"
        ? process.env.FRONTEND_DOMAIN
        : "http://localhost:5173",
    credentials: true,
  }),
);

// routes
routes(app);

// connect to DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
