import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const CATEGORY_LIST = ["All", "Clothing", "Shoes", "Accessories"];
const STATUS_LIST = ["New", "Hot", "Sale"];

interface Props {
  category: string;
  status: string;
  selectedPriceRanges: number[];
  priceRanges: { label: string; min: number; max: number }[];
  onCategoryChange: (cat: string) => void;
  onPriceChange: (index: number) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
}

const FilterSidebar = ({
  category,
  status,
  selectedPriceRanges,
  priceRanges,
  onCategoryChange,
  onPriceChange,
  onStatusChange,
  onReset,
}: Props) => {
  // State quản lý việc đóng/mở các menu con (Accordion logic)
  const [openStates, setOpenStates] = useState({
    category: true,
    price: true,
    status: true,
  });

  const toggle = (key: keyof typeof openStates) => {
    setOpenStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="shrink-0 w-70">
      {/* --- HEADER: FILTERS & RESET --- */}
      <div className="flex justify-between items-center mb-6">
        <p className="font-bold text-lg">FILTERS</p>
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-text-sub hover:text-black font-semibold cursor-pointer rounded-full h-8 px-3"
        >
          Reset All
        </Button>
      </div>

      <div className="space-y-6">
        {/* --- 1. CATEGORY FILTER --- */}
        <div className="border-b pb-5">
          <div
            onClick={() => toggle("category")}
            className="flex w-full items-center justify-between cursor-pointer mb-2 select-none"
          >
            <p className="font-bold text-lg">Category</p>
            <ChevronDown
              strokeWidth={2.5}
              className={cn(
                "size-5 text-text-sub transition-transform duration-300",
                openStates.category ? "rotate-180" : "rotate-0",
              )}
            />
          </div>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openStates.category
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0",
            )}
          >
            <RadioGroup
              value={category || "All"} // Nếu category rỗng thì chọn All
              onValueChange={onCategoryChange}
              className="flex flex-col gap-y-3 mt-2"
            >
              {CATEGORY_LIST.map((cat) => (
                <div key={cat} className="flex items-center gap-3">
                  <RadioGroupItem
                    value={cat}
                    id={`cat-${cat}`}
                    className="size-5 border-gray-400 text-primary"
                  />
                  <Label
                    htmlFor={`cat-${cat}`}
                    className="text-text-sub text-base cursor-pointer hover:text-primary transition-colors"
                  >
                    {cat}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* --- 2. PRICE RANGE FILTER --- */}
        <div className="border-b pb-5">
          <div
            onClick={() => toggle("price")}
            className="flex w-full items-center justify-between cursor-pointer mb-2 select-none"
          >
            <p className="font-bold text-lg">Price Range</p>
            <ChevronDown
              strokeWidth={2.5}
              className={cn(
                "size-5 text-text-sub transition-transform duration-300",
                openStates.price ? "rotate-180" : "rotate-0",
              )}
            />
          </div>

          <div
            className={cn(
              "flex flex-col gap-y-3 mt-2 overflow-hidden transition-all duration-300",
              openStates.price ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {priceRanges.map((range, index) => (
              <div key={index} className="flex items-center gap-3">
                <Checkbox
                  id={`price-${index}`}
                  checked={selectedPriceRanges.includes(index)}
                  onCheckedChange={() => onPriceChange(index)}
                  className="size-5 border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <Label
                  htmlFor={`price-${index}`}
                  className="text-base text-text-sub cursor-pointer hover:text-primary transition-colors"
                >
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* --- 3. STATUS FILTER --- */}
        <div>
          <div
            onClick={() => toggle("status")}
            className="flex w-full items-center justify-between cursor-pointer mb-2 select-none"
          >
            <p className="font-bold text-lg">Status</p>
            <ChevronDown
              strokeWidth={2.5}
              className={cn(
                "size-5 text-text-sub transition-transform duration-300",
                openStates.status ? "rotate-180" : "rotate-0",
              )}
            />
          </div>

          <div
            className={cn(
              "grid grid-cols-3 gap-2 mt-2 overflow-hidden transition-all duration-300",
              openStates.status ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {STATUS_LIST.map((item) => (
              <Button
                key={item}
                variant="ghost"
                onClick={() => onStatusChange(item)}
                className={cn(
                  "border rounded-md transition-colors cursor-pointer",
                  status === item
                    ? "bg-primary text-white hover:bg-primary/90 hover:text-white" // Active state
                    : "text-text-sub hover:bg-gray-100", // Inactive state
                )}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
