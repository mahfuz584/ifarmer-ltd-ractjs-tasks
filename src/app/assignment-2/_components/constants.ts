export const productFormInputs = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter product description",
  },
  {
    name: "categoryId",
    label: "Category ID",
    type: "select",
    placeholder: "Enter category ID",
  },
  {
    name: "images",
    label: "Image URL",
    type: "text",
    placeholder: "Enter image URL",
  },
] as const;
