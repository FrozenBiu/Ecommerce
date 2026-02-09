import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect } from "react";

const Products = () => {
  const { productList, getProductList } = useProductStore();
  const query = {
    keyword: "",
    pageNumber: 1,
    minPrice: 0,
    maxPrice: 999999,
    category: "",
    status: "",
    sort: "newest",
  };

  useEffect(() => {
    getProductList(query);
  }, []);

  const productToShow = productList.products.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-375 mx-auto px-4 md:px-8">
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
            href="/products"
          >
            View All
            <span className="material-symbols-outlined text-[18px]">
              <ArrowRight size={20} />
            </span>
          </a>
        </div>
        {/* <!-- Grid --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {productToShow.map((product, index) => {
            return (
              <ProductCard
                key={index}
                status={product.status}
                productName={product.name}
                category={product.category}
                price={product.price}
                image={product.image}
                id={product._id}
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
