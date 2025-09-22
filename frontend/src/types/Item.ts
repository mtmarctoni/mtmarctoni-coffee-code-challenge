import z from "zod";

// validation with zod
export const CoffeeCategorySchema = z.enum(["robusta", "arabica"], {
  message: "Category must be 'robusta' or 'arabica'",
});

export const CreateCoffeeItemSchema = z.object({
  title: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z
    .number()
    .min(0, "Price must be a positive number")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Price must have at most 2 decimal places",
    }),
  imageUrl: z
    .string()
    .refine(
      (val) =>
        val.startsWith("http://") ||
        val.startsWith("https://") ||
        val.startsWith("/"),
      {
        message:
          "Image URL must be a valid URL (http(s)://...) or a relative path (/...)",
      }
    ),
  category: CoffeeCategorySchema,
});

export const CoffeeItemSchema = CreateCoffeeItemSchema.extend({
  id: z.number().int().positive(),
});

export const CoffeeCategory = CoffeeCategorySchema.enum;

export type CoffeeCategoryType = z.infer<typeof CoffeeCategorySchema>;
export type CreateCoffeeItem = z.infer<typeof CreateCoffeeItemSchema>;
export type CoffeeItem = z.infer<typeof CoffeeItemSchema>;
export type FilterType = CoffeeCategoryType | "all";
