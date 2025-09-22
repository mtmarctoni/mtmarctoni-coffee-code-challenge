"use client";

import { CoffeeCategory, CoffeeCategoryType } from "@/types/Item";

type Props = {
  value: CoffeeCategoryType;
  onChange: (v: CoffeeCategoryType) => void;
};

export default function CategoryToggle({ value, onChange }: Props) {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div>
      <label className="block text-sm text-muted mb-2">Type</label>
      <div className="grid grid-cols-2 gap-3">
        {Object.values(CoffeeCategory).map((category) => (
          <button
            key={category}
            type="button"
            className={`w-full py-3 rounded-lg border text-sm ${
              value === category ? 'text-text border-text' : 'text-muted border-muted'
            }`}
            onClick={() => onChange(category)}
          >
            {capitalize(category)}
          </button>
        ))}
      </div>
    </div>
  );
}
