import authRoute from "./authRoute.js";
import productRoute from "./productRoute.js";
import orderRoute from "./orderRoute.js";
import cartRoute from "./cartRoute.js";
import userRoute from "./userRoute.js";
import { protectedRoutes } from "../middlewares/authMiddleware.js";

function routes(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/products", productRoute);
  app.use("/api/orders", protectedRoutes, orderRoute);
  app.use("/api/cart", protectedRoutes, cartRoute);
  app.use("/api/users", protectedRoutes, userRoute);
}

export default routes;
