import { CoffeeCategory } from "@/types/Item";

export const ERROR_TTL = 5000;

export const initialConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
};

export const initialCoffeeValues = {
  title: "",
  description: "Free in the MVST office",
  price: 5,
  imageUrl: "",
  category: CoffeeCategory.arabica,
} as const;
