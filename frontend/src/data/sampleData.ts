import { Item, CoffeeItem } from "@/types/Item";

export const items: Item[] = [
  {
    id: 1,
    title: "Item 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod officia nobis enim ipsa repellat, vero dolorem et error voluptas voluptate.",
    imageUrl:
      "https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png",
  },
];

export const coffeeItems: CoffeeItem[] = [
  {
    id: 1,
    title: "Dark Roast",
    price: 8.5,
    imageUrl: "/dark-roast.webp",
    category: "arabica",
  },
  {
    id: 2,
    title: "Americano",
    price: 6.5,
    imageUrl: "/americano.webp",
    category: "robusta",
  },
  {
    id: 3,
    title: "Cappuccino",
    price: 9.5,
    imageUrl: "/cappucino.webp",
    category: "arabica",
  },
  {
    id: 4,
    title: "Decaf Americano",
    price: 6.5,
    imageUrl: "/decaf-americano.webp",
    category: "robusta",
  },
  {
    id: 5,
    title: "PineRoast",
    price: 8.5,
    imageUrl: "/pine-roast.webp",
    category: "arabica",
  },
  {
    id: 6,
    title: "Raphael Original",
    price: 9.5,
    imageUrl: "/raphael-original.webp",
    category: "arabica",
  },
];
