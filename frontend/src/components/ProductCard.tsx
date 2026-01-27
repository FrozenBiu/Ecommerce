import { ShoppingBasket } from "lucide-react";

export type ProductCardProps = {
  status: string;
  productName: string;
  category: string;
  price: number | string;
  image: string;
  id: string;
};

const ProductCard = ({
  status = "",
  productName,
  category,
  price,
  image,
  id,
}: ProductCardProps) => {
  return (
    <div className="cursor-pointer group relative flex flex-col bg-white dark:bg-gray-900 rounded-lg border border-border-subtle dark:border-gray-800 transition-all duration-300 hover:shadow-soft hover:border-primary/30 hover:-translate-y-1 overflow-hidden">
      <div className="relative w-full aspect-4/5 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {status && (
          <span className="absolute top-3 left-3 z-10 bg-white dark:bg-gray-800 text-text-main dark:text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            {status}
          </span>
        )}
        <img
          src={image}
          alt=""
          className={`w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110 object-cover`}
        />
        {/* <!-- Quick Action Buttons Overlay --> */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className="cursor-pointer w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-md hover:bg-primary-hover hover:scale-110 transition-all"
            title="Quick Add"
          >
            <span className="material-symbols-outlined text-[20px]">
              <ShoppingBasket size={20} />
            </span>
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-bold text-text-main dark:text-white text-base group-hover:text-primary transition-colors">
          {productName}
        </h3>
        <p className="text-text-sub dark:text-gray-400 text-sm">{category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-primary font-bold text-lg">${price}.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
