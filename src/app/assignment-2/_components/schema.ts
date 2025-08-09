import z from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(200, { message: "Title must be at most 200 characters long" }),
  price: z.number().positive({ message: "Price must be greater than 0" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" })
    .max(2000, { message: "Description must be at most 2000 characters long" }),
  categoryId: z
    .string()
    .min(1, { message: "Category ID is required" })
    .max(255, { message: "Category ID must be at most 255 characters long" }),
  images: z
    .array(z.string().url({ message: "Each image must be a valid URL" }))
    .nonempty({ message: "At least one image is required" }),
});

export type ProductFormInputs = z.infer<typeof productSchema>;
