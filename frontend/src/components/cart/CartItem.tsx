import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const CartItem = () => {
  return (
    <div>
      <div className="my-6 border-[0.5px] divide-dashed rounded-full"></div>

      <div className="flex gap-x-8">
        <div className="rounded-2xl size-35">
          <img
            src="/Hero.png"
            alt=""
            className="size-full rounded-2xl object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="font-bold text-lg">Urban Denim Jacket</p>
          <Badge className="text-green-600 bg-green-100 text-[12px] rounded-md">
            In Stock
          </Badge>
        </div>

        <div className="flex flex-col items-end gap-y-4">
          <p className="font-bold text-lg">$85.00</p>
          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-6 border border-neutral-300 px-2 py-1 rounded-2xl">
              <Button
                variant={"ghost"}
                className="hover:bg-transparent hover:text-primary cursor-pointer"
              >
                <Minus className="size-4" />
              </Button>
              <span className="font-semibold text-lg">1</span>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent hover:text-primary cursor-pointer"
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              className="flex items-center justify-center cursor-pointer group hover:text-red-600"
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
