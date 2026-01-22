import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const MIN_DISTANCE = 10;

const RangeSlider = () => {
  const [range, setRange] = useState<[number, number]>([50, 500]);

  const handleChange = (value: number[]) => {
    const [rawMin, rawMax] = value;
    let min = rawMin;
    let max = rawMax;

    if (max - min < MIN_DISTANCE) {
      //   if (rawMin !== range[0]) {
      min = max - MIN_DISTANCE;
      //   } else {
      max = min + MIN_DISTANCE;
      //   }
    }

    setRange([min, max]);
  };

  return (
    <div className="space-y-4 mt-4">
      <Slider
        value={range}
        max={1000}
        step={1}
        minStepsBetweenThumbs={MIN_DISTANCE}
        onValueChange={handleChange}
      />

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center rounded-lg border border-[#e8e7f3] bg-surface-light px-3 py-2 dark:border-[#2d2d45] dark:bg-surface-dark">
          <span className="text-xs text-text-secondary">$</span>
          <input
            className="w-full bg-transparent p-0 text-right text-sm font-medium focus:ring-0 border-none"
            type="number"
            value={range[0]}
          />
        </div>
        <span className="text-text-secondary">-</span>
        <div className="flex flex-1 items-center rounded-lg border border-[#e8e7f3] bg-surface-light px-3 py-2 dark:border-[#2d2d45] dark:bg-surface-dark">
          <span className="text-xs text-text-secondary">$</span>
          <input
            className="w-full bg-transparent p-0 text-right text-sm font-medium focus:ring-0 border-none"
            type="number"
            value={range[1]}
          />
        </div>
      </div>
    </div>
  );
};
export default RangeSlider;
