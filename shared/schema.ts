import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  imageUrl: z.string(),
  inStock: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;

export const orderSchema = z.object({
  productName: z.string().min(1, "Название товара обязательно"),
  price: z.number().positive("Цена должна быть положительной"),
  size: z.enum(["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"], {
    required_error: "Выберите размер",
  }),
  telegramUsername: z.string()
    .min(3, "Минимум 3 символа")
    .max(32, "Максимум 32 символа")
    .regex(/^[a-zA-Z0-9_]+$/, "Только латинские буквы, цифры и _"),
});

export type Order = z.infer<typeof orderSchema>;
export type InsertOrder = z.infer<typeof orderSchema>;

export const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"] as const;
export type Size = typeof sizes[number];
