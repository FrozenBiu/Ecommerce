import Footer from "@/components/Footer";
import Navigate from "@/components/Navigate";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ProductList = () => {
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [priceToggle, setPriceToggle] = useState(false);
  const [sizeToggle, setSizeToggle] = useState(false);
  const [colorToggle, setColorToggle] = useState(false);

  return (
    <>
      <Navigate />
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-5">
        <div className="flex gap-5">
          {/* Left side menu */}
          <div className="shrink-0 w-70">
            {/* Filter */}
            <div className="w-full flex items-center justify-between">
              <p className="font-bold text-lg">FILTERS</p>
              <Button
                variant="ghost"
                className="text-text-sub hover:text-black font-semibold cursor-pointer"
              >
                Reset All
              </Button>
            </div>

            <div className="mt-6 space-y-2">
              {/* Category */}
              <div className="">
                <div
                  onClick={() => setCategoryToggle(!categoryToggle)}
                  className="flex w-full items-center justify-between cursor-pointer"
                >
                  <p className="font-bold text-lg">Category</p>
                  <ChevronDown
                    strokeWidth={2.5}
                    className={`size-5 text-text-sub transition-transform duration-300 ease-in-out ${categoryToggle ? "rotate-180" : "rotate-0"}`}
                  />
                </div>

                <div
                  className={`flex flex-col gap-y-2 mt-3 overflow-hidden transition-all duration-300 text-text-sub ${
                    categoryToggle
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="All Products" />
                    All Products
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Clothing" />
                    Clothing
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Shoes" />
                    Shoes
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Accessories" />
                    Accessories
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="">
                <div
                  onClick={() => setPriceToggle(!priceToggle)}
                  className="flex w-full items-center justify-between cursor-pointer"
                >
                  <p className="font-bold text-lg">Price Range</p>
                  <ChevronDown
                    strokeWidth={2.5}
                    className={`size-5 text-text-sub transition-transform duration-300 ease-in-out ${priceToggle ? "rotate-180" : "rotate-0"}`}
                  />
                </div>

                <div
                  className={`flex flex-col gap-y-2 mt-3 overflow-hidden transition-all duration-300 text-text-sub ${
                    priceToggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="All Products" />
                    All Products
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Clothing" />
                    Clothing
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Shoes" />
                    Shoes
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Accessories" />
                    Accessories
                  </label>
                </div>
              </div>

              {/* Size */}
              <div className="">
                <div
                  onClick={() => setSizeToggle(!sizeToggle)}
                  className="flex w-full items-center justify-between cursor-pointer"
                >
                  <p className="font-bold text-lg">Size</p>
                  <ChevronDown
                    strokeWidth={2.5}
                    className={`size-5 text-text-sub transition-transform duration-300 ease-in-out ${sizeToggle ? "rotate-180" : "rotate-0"}`}
                  />
                </div>

                <div
                  className={`flex flex-col gap-y-2 mt-3 overflow-hidden transition-all duration-300 text-text-sub ${
                    sizeToggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="All Products" />
                    All Products
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Clothing" />
                    Clothing
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Shoes" />
                    Shoes
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Accessories" />
                    Accessories
                  </label>
                </div>
              </div>

              {/* Color */}
              <div className="">
                <div
                  onClick={() => setColorToggle(!colorToggle)}
                  className="flex w-full items-center justify-between cursor-pointer"
                >
                  <p className="font-bold text-lg">Color</p>
                  <ChevronDown
                    strokeWidth={2.5}
                    className={`size-5 text-text-sub transition-transform duration-300 ease-in-out ${colorToggle ? "rotate-180" : "rotate-0"}`}
                  />
                </div>

                <div
                  className={`flex flex-col gap-y-2 mt-3 overflow-hidden transition-all duration-300 text-text-sub ${
                    colorToggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="All Products" />
                    All Products
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Clothing" />
                    Clothing
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Shoes" />
                    Shoes
                  </label>
                  <label className="flex gap-3">
                    <input type="radio" name="category" value="Accessories" />
                    Accessories
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-blue-500 flex-1">2</div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductList;
