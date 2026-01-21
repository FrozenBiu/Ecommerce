import Footer from "@/components/Footer";
import Navigate from "@/components/Navigate";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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
                  <Slider
                    defaultValue={[100, 150]}
                    max={200}
                    step={1}
                    className="px-3 h-6 rounded-full"
                  />

                  {/* <div className="mt-2 relative h-1.5 w-full rounded-full range-slider-track">
                    <div className="absolute left-[25%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow cursor-grab"></div>
                    <div className="absolute left-[75%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow cursor-grab"></div>
                  </div> */}

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center rounded-lg border border-[#e8e7f3] bg-surface-light px-3 py-2 dark:border-[#2d2d45] dark:bg-surface-dark">
                      <span className="text-xs text-text-secondary">$</span>
                      <input
                        className="w-full bg-transparent p-0 text-right text-sm font-medium focus:ring-0 border-none"
                        type="number"
                        value="25"
                      />
                    </div>
                    <span className="text-text-secondary">-</span>
                    <div className="flex flex-1 items-center rounded-lg border border-[#e8e7f3] bg-surface-light px-3 py-2 dark:border-[#2d2d45] dark:bg-surface-dark">
                      <span className="text-xs text-text-secondary">$</span>
                      <input
                        className="w-full bg-transparent p-0 text-right text-sm font-medium focus:ring-0 border-none"
                        type="number"
                        value="150"
                      />
                    </div>
                  </div>
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
