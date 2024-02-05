import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(1000, "Description must be at most 1000 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be at most 400 characters"),
  imageUrl: z.string().url("Invalid URL"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string().min(3, "Category must be at least 3 characters"),
  price: z.string().min(3, "Price must be at least 3 characters"),
  isFree: z.boolean(),
  url: z.string().url("Invalid URL"),
});
