import CartItem from "@/components/cart/CartItem";
import Navigate from "@/components/Navigate";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import useCartStore from "@/stores/useCartStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Cart = () => {
  const { user, loading } = useAuthStore();
  const { cart, getCurrentCart } = useCartStore();
  const [cartLoading, setCartLoading] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (user?._id) {
      getCurrentCart(user._id);
      setCartLoading(false);
    }
  }, [user, getCurrentCart]);

  const items = cart?.items || []; // danh sách sản phẩm trong giỏ hàng

  const tax = Math.ceil(cart?.totalPrice * 0.05);
  const orderTotal = cart?.totalPrice + tax;

  if (loading || cartLoading) return <div>Đang tải...</div>;
  if (!user) return <div>Vui lòng đăng nhập</div>;

  return (
    <>
      <Navigate />
      <main>
        <section className="max-w-375 mx-auto px-4 md:px-8 py-10 md:py-16 flex justify-between gap-10">
          {/* main content */}
          <div className="flex-1">
            <div>
              <h2 className="font-extrabold text-4xl text-text-main">
                Your Cart
              </h2>
              {cart?.items.length > 0 && (
                <p className="text-secondary text-md mt-1">
                  {cart?.items.length} items in your bag
                </p>
              )}
            </div>

            {/* list of items */}
            <div className="my-5">
              {items && items.length > 0 ? (
                items.map((item, index) => {
                  return (
                    <CartItem
                      key={index}
                      id={item.product}
                      productImage={item.image}
                      productName={item.name}
                      price={item.price}
                      quantity={item.qty}
                    />
                  );
                })
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>

            <Button
              onClick={handleBack}
              variant={"link"}
              className="mt-5 font-semibold text-md hover:font-bold hover:no-underline cursor-pointer group"
            >
              <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform duration-300" />{" "}
              Continue Shopping
            </Button>
          </div>

          {/* Order summary */}
          <div className="h-fit min-w-95 shadow-2xl rounded-lg p-8">
            <p className="text-xl font-bold">Order Summary</p>

            <div className="my-5 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-secondary font-medium">Subtotal</p>
                <p className="font-semibold">${cart?.totalPrice}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-secondary font-medium">Shipping estimate</p>
                <p className="font-semibold">Free</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-secondary font-medium">Tax</p>
                <p className="font-semibold">${tax}</p>
              </div>
            </div>

            <div className="my-5 border divide-dashed rounded-full"></div>

            <div className="flex items-center justify-between">
              <p className="font-bold text-lg">Order Total</p>
              <p className="font-extrabold text-3xl">${orderTotal}</p>
            </div>

            <Button className="mt-5 rounded-2xl w-full cursor-pointer group py-5">
              Proceed to Checkout
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Cart;
