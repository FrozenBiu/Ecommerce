import { useState, useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { useSearchParams } from "react-router";

const PRICE_RANGES = [
  { label: "0-20$", min: 0, max: 20 },
  { label: "21-50$", min: 21, max: 50 },
  { label: "51-100$", min: 51, max: 100 },
  { label: ">100$", min: 101, max: 999999 },
];

export const useProductQuery = () => {
  const { getProductList } = useProductStore();

  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [sortLabel, setSortLabel] = useState("Newest");
  const categoryFromUrl = searchParams.get("category") || "";

  const [query, setQuery] = useState({
    keyword: "",
    pageNumber: 1,
    minPrice: 0,
    maxPrice: 999999,
    category: categoryFromUrl,
    status: "",
    sort: "newest",
  });

  useEffect(() => {
    const cat = searchParams.get("category") || "";
    setQuery((prev) => ({ ...prev, category: cat }));
  }, [searchParams]);

  // Handlers
  const setPage = (pageNumber: number) => {
    setQuery((prev) => ({ ...prev, pageNumber }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setSort = (value: string, label: string) => {
    setSortLabel(label);
    setQuery((prev) => ({ ...prev, sort: value, pageNumber: 1 }));
  };

  const setCategory = (cat: string) => {
    setSearchParams({ category: cat !== "All" ? cat : "" });
  };

  const setStatus = (status: string) => {
    setQuery((prev) => ({
      ...prev,
      status: prev.status === status ? "" : status,
      pageNumber: 1,
    }));
  };

  const togglePriceRange = (index: number) => {
    let newRanges = [...selectedPriceRanges];
    if (newRanges.includes(index)) {
      newRanges = newRanges.filter((i) => i !== index);
    } else {
      newRanges.push(index);
    }
    setSelectedPriceRanges(newRanges);

    if (newRanges.length === 0) {
      setQuery((prev) => ({
        ...prev,
        minPrice: 0,
        maxPrice: 999999,
        pageNumber: 1,
      }));
    } else {
      const selectedItems = newRanges.map((i) => PRICE_RANGES[i]);
      const newMin = Math.min(...selectedItems.map((item) => item.min));
      const newMax = Math.max(...selectedItems.map((item) => item.max));
      setQuery((prev) => ({
        ...prev,
        minPrice: newMin,
        maxPrice: newMax,
        pageNumber: 1,
      }));
    }
  };

  const resetFilters = () => {
    setSelectedPriceRanges([]);
    setSortLabel("Newest");
    setQuery({
      keyword: "",
      pageNumber: 1,
      minPrice: 0,
      maxPrice: 999999,
      category: "",
      status: "",
      sort: "newest",
    });
  };

  // Effect calling API
  useEffect(() => {
    getProductList(query);
  }, [query, getProductList]);

  return {
    query,
    sortLabel,
    selectedPriceRanges,
    setPage,
    setSort,
    setCategory,
    setStatus,
    togglePriceRange,
    resetFilters,
    PRICE_RANGES, // Export constant để dùng ở UI
  };
};
