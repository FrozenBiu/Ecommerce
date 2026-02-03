import Footer from "@/components/Footer";
import Navigate from "@/components/Navigate";
import ProductCard from "@/components/ProductCard";
import ProductPagination from "@/components/product/ProductPagination";
import FilterSidebar from "@/components/product/FilterSidebar";
import { useProductStore } from "@/stores/useProductStore";
import { useProductQuery } from "@/hooks/useProductQuery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

const ProductList = () => {
  // 1. Lấy Data từ Store
  const { loading, productList } = useProductStore();
  const { products, totalPages } = productList;

  // 2. Lấy Logic từ Custom Hook
  const {
    query,
    sortLabel,
    selectedPriceRanges,
    PRICE_RANGES,
    setPage,
    setSort,
    setCategory,
    setStatus,
    togglePriceRange,
    resetFilters,
  } = useProductQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navigate />
      <section className="max-w-375 min-h-[75vh] mx-auto mt-5 px-4 md:px-8 py-5">
        <div className="flex gap-10">
          {/* --- LEFT: SIDEBAR --- */}
          <FilterSidebar
            category={query.category}
            status={query.status}
            selectedPriceRanges={selectedPriceRanges}
            priceRanges={PRICE_RANGES}
            onCategoryChange={setCategory}
            onPriceChange={togglePriceRange}
            onStatusChange={setStatus}
            onReset={resetFilters}
          />

          {/* --- RIGHT: CONTENT --- */}
          <div className="flex-1">
            {/* Header + Sort */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-4xl font-extrabold">New Arrivals</h2>
                <p className="text-text-sub">Explore the collection</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-text-sub">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-40 justify-between">
                      {sortLabel}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuGroup>
                      <DropdownMenuRadioGroup value={query.sort}>
                        <DropdownMenuRadioItem
                          value="newest"
                          onSelect={() => setSort("newest", "Newest")}
                        >
                          Newest
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="oldest"
                          onSelect={() => setSort("oldest", "Oldest")}
                        >
                          Oldest
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="price-asc"
                          onSelect={() =>
                            setSort("price-asc", "Price: Low to High")
                          }
                        >
                          Price: Low to High
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="price-desc"
                          onSelect={() =>
                            setSort("price-desc", "Price: High to Low")
                          }
                        >
                          Price: High to Low
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <p>Loading...</p>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    status={product.status}
                    productName={product.name}
                    category={product.category}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
            )}

            {/* Pagination Component */}
            <ProductPagination
              currentPage={query.pageNumber}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductList;
