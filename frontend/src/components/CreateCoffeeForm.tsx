"use client";

import { useEffect, useState } from "react";
import { createCoffee } from "@/services/coffeeApi";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import CategoryToggle from "@/components/CategoryToggle";
import Toast from "@/components/Toast";
import { ErrorIcon } from "@/components/icons";
import { CoffeeCategoryType, CreateCoffeeItemSchema } from "@/types/Item";
import { initialCoffeeValues, ERROR_TTL } from "@/app/config";
import { useField } from "../hooks/useField";

export default function CreateCoffeeForm(): JSX.Element {
    const router = useRouter();
    
    const title = useField<string>(initialCoffeeValues.title);
    const description = useField<string>(initialCoffeeValues.description);
    const price = useField<number>(initialCoffeeValues.price);
    const imageUrl = useField<string>(initialCoffeeValues.imageUrl);

  const [category, setCategory] = useState<CoffeeCategoryType>(initialCoffeeValues.category);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // useEffect to show the error only 5 seconds
    useEffect(() => {
        if (fieldErrors) {
            const timer = setTimeout(() => {
                setFieldErrors({});
            }, ERROR_TTL);
            return () => clearTimeout(timer);
        }
    }, [fieldErrors]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setFieldErrors({});
    
    // Build payload from useField values
    const payload = {
      title: title.value,
      description: description.value,
      price: price.value,
      imageUrl: imageUrl.value,
      category,
    };

    // Validate with zod schema
    const validation = CreateCoffeeItemSchema.safeParse(payload);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    try {
      await createCoffee(payload);
      // optionally redirect or close dialog; caller handles it
    } catch (err: any) {
      setApiError(err?.message || "Failed to create coffee");
    }
  };

  const onDiscard = () => {
    router.push("/");
  };

  return (
    <>
      {/* Toast for API errors */}
      <Toast
        message={apiError || ""}
        isVisible={!!apiError}
        onClose={() => setApiError(null)}
        duration={5000}
      />

      <form onSubmit={submit} className="w-full px-0 py-8 space-y-4">
        {/* Field validation errors only */}
        {Object.keys(fieldErrors).length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 space-y-2">
            {Object.entries(fieldErrors).map(([field, message]) => (
              <div key={field} className="flex items-center gap-2 text-error text-sm">
                <ErrorIcon className="w-4 h-4 text-error" />
                <span className="capitalize">{field}:</span>
                <span>{message}</span>
              </div>
            ))}
          </div>
        )}

      <div className="flex items-start gap-4 w-full">
        <div className="flex-1">
          <InputField 
            label="Name" 
            placeholder="Name your coffee here" 
            value={title.value} 
            onChange={title.onChange} 
            required 
          />
        </div>

        <div className="w-28 flex-shrink-0">
          <InputField 
            label="Price" 
            placeholder="0.00" 
            value={price.value} 
            onChange={price.onChange} 
            type="number" 
            rightSymbol="€" 
            required 
          />
        </div>
      </div>

      <CategoryToggle value={category} onChange={setCategory} />

  <InputField 
    label="Upload image" 
    placeholder="Paste image URL here" 
    value={imageUrl.value} 
    onChange={imageUrl.onChange} 
    required 
  />

  <InputField 
    label="Description" 
    placeholder="Add a description" 
    value={description.value} 
    onChange={description.onChange} 
    type="textarea" 
  />

      <div className="flex items-center justify-center gap-6 mt-2">
        <button
          type="button"
          className="px-6 py-2 rounded-full text-sm border border-accent text-text bg-transparent hover:bg-accent/10"
          onClick={onDiscard}
        >
          Discard
        </button>

        <button
          type="submit"
                      className="px-6 py-2 rounded-full text-sm font-semibold text-muted bg-accent/50 hover:bg-accent hover:text-text"
        >
          Confirm
        </button>
      </div>
    </form>
    </>
  );
}
