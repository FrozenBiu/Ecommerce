import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import useCartStore from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import useDebounce from "@/hooks/useDebounce";

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
  const debouncedQty = useDebounce(qty, 300);
  const { updateCart, removeFromCart } = useCartStore();
  const { user } = useAuthStore();

  const handlePlus = async () => {
    const newQty = qty + 1;
    setQty(newQty);
  };

  const handleMinus = async () => {
    const newQty = qty - 1;
    setQty(newQty);
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

  // Sau khi người dùng thay đổi số lượng sản phẩm, sau 300ms thì mới gọi API updateCart
  useEffect(() => {
    if (!debouncedQty) return;

    const callAPI = async () => {
      await updateCart(user?._id, id, qty);
    };

    callAPI();
  }, [debouncedQty]);

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  return (
    <div data-product-id={id}>
      <div className="my-6 border-[0.5px] divide-dashed rounded-full"></div>

      <div className="flex gap-x-4 sm:gap-x-8">
        <div className="rounded-2xl size-35 aspect-square">
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

        <div className="flex flex-col sm:gap-y-4">
          {/* price */}
          <p className="font-bold text-lg text-end">${price}.00</p>

          <div className="flex sm:flex-row flex-col items-end sm:items-center sm:gap-x-3 gap-y-3 sm:mt-0 mt-3">
            {/* amount */}
            <div className="flex items-center gap-x-1 sm:gap-x-3 border border-neutral-300 px-1 sm:px-2 py-1 rounded-2xl">
              <Button
                variant={"ghost"}
                className="hover:bg-transparent hover:text-primary cursor-pointer"
                onClick={handleMinus}
              >
                <Minus className="size-3 sm:size-4" />
              </Button>
              <span className="font-semibold text-md sm:text-lg">{qty}</span>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent hover:text-primary cursor-pointer"
                onClick={handlePlus}
              >
                <Plus className="size-3 sm:size-4" />
              </Button>
            </div>

            {/* delete item */}
            <Button
              variant="ghost"
              className="w-fit flex items-center justify-end sm:justify-center cursor-pointer group hover:text-red-600"
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
