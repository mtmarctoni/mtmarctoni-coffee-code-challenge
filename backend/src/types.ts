export interface CoffeeItem extends CreateCoffeeItem {
  id: number;
}

export interface CreateCoffeeItem {
  title: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: 'robusta' | 'arabica';
}
