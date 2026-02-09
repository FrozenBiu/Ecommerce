import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import useCartStore from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";

export type CartItemProp = {
  id: string;
  productImage: string;
  productName: string;
  price: number;
  quantity: number;
};

const CartItem = ({
  id,
  productImage,
  productName,
  price,
  quantity,
}: CartItemProp) => {
  const [qty, setQty] = useState(quantity);
  const { updateCart, removeFromCart } = useCartStore();
  const { user } = useAuthStore();

  const handlePlus = async () => {
    const newQty = qty + 1;
    setQty(newQty);

    if (user?._id) {
      await updateCart(user._id, id, newQty);
    }
  };

  const handleMinus = async () => {
    const newQty = qty - 1;
    setQty(newQty);

    if (user?._id) {
      await updateCart(user._id, id, newQty);
    }
  };

  const handleDeleteFromCart = async () => {
    if (!user?._id) {
      console.log("No userId");
      return;
    }

    if (user?._id) {
      await removeFromCart(user._id, id);
    }
  };

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  return (
    <div data-product-id={id}>
      <div className="my-6 border-[0.5px] divide-dashed rounded-full"></div>

      <div className="flex gap-x-8">
        <div className="rounded-2xl size-35">
          <img
            src={productImage}
            alt=""
            className="size-full rounded-2xl object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="font-bold text-lg">{productName}</p>
          <Badge className="text-green-600 bg-green-100 text-[12px] rounded-md">
            In Stock
          </Badge>
        </div>

        <div className="flex flex-col items-end gap-y-4">
          <p className="font-bold text-lg">${price}.00</p>
          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-3 border border-neutral-300 px-2 py-1 rounded-2xl">
              <Button
                variant={"ghost"}
                className="hover:bg-transparent hover:text-primary cursor-pointer"
                onClick={handleMinus}
              >
                <Minus className="size-4" />
              </Button>
              <span className="font-semibold text-lg">{qty}</span>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent hover:text-primary cursor-pointer"
                onClick={handlePlus}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              className="flex items-center justify-center cursor-pointer group hover:text-red-600"
              onClick={handleDeleteFromCart}
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
