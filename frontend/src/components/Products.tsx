import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

const productList: {
  status: string;
  productName: string;
  category: string;
  price: number;
  image: string;
}[] = [
  {
    status: "New",
    productName: "Cotton Basic Tee",
    category: "Essential Collection",
    price: 35,
    image: "/ProductCard/img1.png",
  },
  {
    status: "",
    productName: "Urban Denim Jacket",
    category: "Outerwear",
    price: 89,
    image: "/ProductCard/img2.png",
  },
  {
    status: "Sale",
    productName: "Vanguard Sneakers",
    category: "Footwear",
    price: 95,
    image: "/ProductCard/img3.png",
  },
  {
    status: "",
    productName: "Everyday Backpack",
    category: "Accessories",
    price: 65,
    image: "/ProductCard/img4.png",
  },
];

const Products = () => {
  return (
    <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* <!-- Section Header --> */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white tracking-tight">
              Trending Now
            </h2>
            <p className="text-text-sub dark:text-gray-400 mt-2 text-sm md:text-base">
              Handpicked favorites just for you.
            </p>
          </div>
          <a
            className="hidden md:flex items-center gap-1 text-primary font-bold hover:gap-2 transition-all text-sm"
            href="#"
          >
            View All
            <span className="material-symbols-outlined text-[18px]">
              <ArrowRight size={20} />
            </span>
          </a>
        </div>
        {/* <!-- Grid --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {productList.map((product, index) => {
            return (
              <ProductCard
                key={index}
                status={product.status}
                productName={product.productName}
                category={product.category}
                price={product.price}
                image={product.image}
              />
            );
          })}
        </div>
        {/* <!-- Show More Mobile --> */}
        <div className="mt-8 flex justify-center md:hidden">
          <button className="px-6 py-3 w-full bg-white dark:bg-gray-800 border border-border-subtle dark:border-gray-700 text-text-main dark:text-white font-bold rounded-lg shadow-sm">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
