import CartItem from "@/components/cart/CartItem";
import Navigate from "@/components/Navigate";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Cart = () => {
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
              <p className="text-secondary text-md mt-1">3 items in your bag</p>
            </div>

            {/* list of items */}
            <div className="my-5">
              <CartItem />
              <CartItem />
              <CartItem />
            </div>

            <Button
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
                <p className="font-semibold">$180.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-secondary font-medium">Shipping estimate</p>
                <p className="font-semibold">Free</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-secondary font-medium">Tax</p>
                <p className="font-semibold">$14.40</p>
              </div>
            </div>

            <div className="my-5 border divide-dashed rounded-full"></div>

            <div className="flex items-center justify-between">
              <p className="font-bold text-lg">Order Total</p>
              <p className="font-extrabold text-3xl">$144.40</p>
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
