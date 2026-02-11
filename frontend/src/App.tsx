import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect, useState } from "react";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Loading from "./components/Loading";

function App() {
  const { accessToken, user, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  const init = async () => {
    // có thể xảy ra khi refresh trang
    if (!accessToken) {
      await refresh();
    }

    if (accessToken && !user) {
      await fetchMe();
    }

    setStarting(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (starting) return <Loading />;
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<HomePage />} />

          {/* private routes */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
