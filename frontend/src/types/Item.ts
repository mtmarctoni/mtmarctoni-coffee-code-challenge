export type CoffeeItem = {
  id: number;
  title: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: "robusta" | "arabica";
};

export type Item = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};
