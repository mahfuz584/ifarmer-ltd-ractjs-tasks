"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProductMutation } from "@/redux/query/productsQuery";
import { zodResolver } from "@hookform/resolvers/zod";

import { revalidateTags } from "@/actions";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { productFormInputs } from "./constants";
import { ProductFormInputs, productSchema } from "./schema";
import { UpdateDialogBoxProps } from "./types";

const UpdateProductDialogForm = ({
  productId,
  onClose,
  products,
  categories,
}: UpdateDialogBoxProps) => {
  const router = useRouter();
  const matchProduct = products.find((product) => product.id === productId);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      title: matchProduct?.title || "",
      price: matchProduct?.price || 0,
      description: matchProduct?.description || "",
      categoryId: String(matchProduct?.category.id) || "",
      images: matchProduct?.images || [],
    },
    resolver: zodResolver(productSchema),
  });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onSubmit = async (data: ProductFormInputs) => {
    const response = await updateProduct({ id: productId, data });

    if (response.error && "data" in response.error) {
      alert("Error updating product");
    }

    onClose();
    router.refresh();
    revalidateTags(["products"]);
    alert("Product updated successfully");
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full cursor-pointer mt-10 mb-4">
          Update Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Change product title and/or price below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-4 max-w-[398px]"
        >
          {productFormInputs.map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <Label htmlFor={name} className="mb-2">
                {label}
              </Label>
              <Controller
                control={control}
                name={name}
                render={({ field }) => {
                  if (type === "textarea") {
                    return (
                      <Textarea
                        id={name}
                        {...field}
                        placeholder={placeholder}
                        rows={4}
                      />
                    );
                  }

                  if (type === "select") {
                    return (
                      <Select
                        onValueChange={field.onChange}
                        value={String(field.value)}
                        defaultValue={String(field.value)}
                      >
                        <SelectTrigger id={name} className="w-full">
                          <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((option) => (
                              <SelectItem
                                key={option.id}
                                value={String(option.id)}
                                className="w-full"
                              >
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }

                  return (
                    <Input
                      id={name}
                      {...field}
                      type={type === "number" ? "number" : "text"}
                      placeholder={placeholder}
                      onChange={(e) =>
                        type === "number"
                          ? field.onChange(Number(e.target.value))
                          : type === "text" && name === "images"
                          ? field.onChange([e.target.value])
                          : field.onChange(e.target.value)
                      }
                      value={
                        type === "text" && name === "images"
                          ? Array.isArray(field.value)
                            ? field.value[0] || ""
                            : ""
                          : field.value || ""
                      }
                    />
                  );
                }}
              />
              {errors[name] && (
                <p className="text-sm text-red-600 mt-1">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}

          <Button
            disabled={isLoading}
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold w-full py-2 mt-4"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialogForm;
