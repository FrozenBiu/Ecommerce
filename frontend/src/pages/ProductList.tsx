import Footer from "@/components/Footer";
import Navigate from "@/components/Navigate";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/stores/useProductStore";
import { cn } from "@/lib/utils";

const categoryList = ["All", "Clothing", "Shoes", "Accessories"];
const statusList = ["New", "Hot", "Sale"];
const priceList = ["0-20$", "21-50$", "51-100$", ">100$"];

const ProductList = () => {
  const { loading, productList, getProductList } = useProductStore();
  const { products, totalPages } = productList; // lấy các thông tin của productList ra để dùng gọn hơn

  const [position, setPosition] = useState("Category");

  const [categoryToggle, setCategoryToggle] = useState(false);
  const [priceToggle, setPriceToggle] = useState(false);
  const [sizeToggle, setSizeToggle] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1);
  const [category, setCategory] = useState("");

  const [query, setQuery] = useState({
    keyword: "",
    pageNumber: 1,
    minPrice: 1,
    maxPrice: 99999,
    category: "",
  });

  const page = query.pageNumber;
  const generatePages = () => {
    const pages = [];

    // case tổng trang nhỏ -> show all
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // luôn có trang 1
    pages.push(1);

    // nếu trang hiện tại > 3 => thêm "..."
    if (page > 3) {
      pages.push("...");
    }

    // trang ở giữa (page-1, page, page+1)
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // nếu page < totalPages - 2 => thêm "..."
    if (page < totalPages - 2) {
      pages.push("...");
    }

    // luôn có trang cuối
    pages.push(totalPages);

    return pages;
  };

  const pageToShow = generatePages();

  const handleChangePage = (pageNumber: number) => {
    setQuery((prev) => ({
      ...prev,
      pageNumber,
    }));
  };

  const handleNext = () => {
    setQuery((prev) => {
      if (prev.pageNumber >= totalPages) return prev;
      return { ...prev, pageNumber: prev.pageNumber + 1 };
    });
  };

  const handlePrev = () => {
    setQuery((prev) => {
      if (prev.pageNumber <= 1) return prev;
      return { ...prev, pageNumber: prev.pageNumber - 1 };
    });
  };

  const fetchProducts = async (query: {
    keyword: string;
    pageNumber: number;
    minPrice: number;
    maxPrice: number;
    category: string;
  }) => {
    await getProductList(query);
  };

  useEffect(() => {
    fetchProducts(query);
  }, [query]);

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
                className="text-text-sub hover:text-black font-semibold cursor-pointer rounded-full"
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
                    className={`size-5  text-text-sub transition-transform duration-300 ease-in-out ${categoryToggle ? "rotate-180" : "rotate-0"}`}
                  />
                </div>

                <RadioGroup
                  defaultValue="option-one"
                  className={`text-lg flex flex-col gap-y-2 mt-4 overflow-hidden transition-all duration-300 text-text-sub ${
                    categoryToggle
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {categoryList.map((category, index) => {
                    return (
                      <div key={category} className="flex items-center gap-3">
                        <RadioGroupItem
                          value={`option-${index + 1}}`}
                          id={`option-${index + 1}}`}
                          className="size-5"
                        />
                        <Label
                          htmlFor={`option-${index + 1}}`}
                          className="text-text-sub text-lg"
                        >
                          {category}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
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
                  {/* <RangeSlider /> */}
                  {priceList.map((price) => {
                    return (
                      <div key={price} className="flex items-center gap-3">
                        <Checkbox id={price} className="size-5" />
                        <Label htmlFor={price} className="text-lg">
                          {price}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status */}
              <div className="">
                <div
                  onClick={() => setSizeToggle(!sizeToggle)}
                  className="flex w-full items-center justify-between cursor-pointer"
                >
                  <p className="font-bold text-lg">Status</p>
                  <ChevronDown
                    strokeWidth={2.5}
                    className={`size-5 text-text-sub transition-transform duration-300 ease-in-out ${sizeToggle ? "rotate-180" : "rotate-0"}`}
                  />
                </div>

                <div
                  className={`grid grid-cols-4 gap-x-2 gap-y-2 mt-4 overflow-hidden transition-all duration-300 text-text-sub ${
                    sizeToggle ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {statusList.map((status) => (
                    <Button
                      key={status}
                      data-status={status}
                      variant="ghost"
                      className={`border cursor-pointer rounded-md hover:bg-primary hover:text-white`}
                      onClick={(e) => {
                        if (e.currentTarget.dataset.status === status) {
                          e.currentTarget.classList.toggle("bg-primary");
                          e.currentTarget.classList.toggle("text-white");
                        }
                      }}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 ">
            {/* Top */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-5xl font-extrabold">New Arrivals</h2>
                <p className="text-text-sub">
                  Explore the latest additions to our minimalist collection
                </p>
              </div>

              {/* Filter */}
              <div className=" flex items-center gap-3">
                <p className="text-text-sub">Sort by:</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-30">
                      <div className="w-full h-full flex items-center justify-between">
                        {position}
                        <ChevronDown strokeWidth={2.5} />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    <DropdownMenuGroup>
                      <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                      >
                        <DropdownMenuRadioItem value="Category">
                          Category
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Price">
                          Price
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Size">
                          Size
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Middle */}
            <div className="mt-6 grid grid-cols-4 grid-rows-2 gap-3">
              {products.map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    status={product.status}
                    productName={product.name}
                    category={product.category}
                    price={product.price}
                    image={product.image}
                  />
                );
              })}
            </div>

            {/* Bottom */}
            <div className="my-15">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={query.pageNumber === 1 ? undefined : handlePrev}
                      className={cn(
                        "cursor-pointer",
                        query.pageNumber === 1 &&
                          "pointer-events-none opacity-50",
                      )}
                    />
                  </PaginationItem>

                  {pageToShow.map((p, index) => (
                    <PaginationItem key={index}>
                      {p === "..." ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          isActive={p === query.pageNumber}
                          onClick={() => handleChangePage(p)}
                          className="cursor-pointer"
                        >
                          {p}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={
                        query.pageNumber === totalPages ? undefined : handleNext
                      }
                      className={cn(
                        "cursor-pointer",
                        query.pageNumber === totalPages &&
                          "pointer-events-none opacity-50",
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductList;
