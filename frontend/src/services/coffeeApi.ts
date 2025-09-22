import { apiBaseUrl } from "@/app/config";
import { CoffeeItem } from "@/types/Item";

const API = apiBaseUrl;

export const fetchItems = async (): Promise<CoffeeItem[]> => {
  const res = await fetch(`${API}/coffees`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch coffees");
  return res.json();
};

export const createCoffee = async (payload: Partial<CoffeeItem>) => {
  const res = await fetch(`${API}/coffees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let parsed: any = null;
  try {
    parsed = JSON.parse(text || "{}");
  } catch (e) {
    parsed = null;
  }

  if (!res.ok) {
    const message = (parsed && parsed.message) || "Failed to create coffee";
    const err: any = new Error(message);
    err.status = res.status;
    err.body = parsed;
    throw err;
  }

  return parsed;
};
