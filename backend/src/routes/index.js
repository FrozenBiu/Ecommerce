import authRoute from "./authRoute.js";
import productRoute from "./productRoute.js";
import orderRoute from "./orderRoute.js";
import cartRoute from "./cartRoute.js";

function routes(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/products", productRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/cart", cartRoute);
}

export default routes;
