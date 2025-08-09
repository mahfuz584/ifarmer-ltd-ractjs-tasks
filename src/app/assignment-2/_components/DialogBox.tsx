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
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProductMutation } from "@/redux/query/productsQuery";
import { zodResolver } from "@hookform/resolvers/zod";

import { revalidateTags } from "@/actions";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { productFormInputs } from "./constants";
import { ProductFormInputs, productSchema } from "./schema";
import { Category } from "./types";

const ProductDialogForm = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: "",
      images: [],
    },
    resolver: zodResolver(productSchema),
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (data: ProductFormInputs) => {
    const response = await createProduct({
      ...data,
    });

    if (response.error && "data" in response.error) {
      alert("Error creating product");
    }

    alert("Product created successfully");
    revalidateTags(["products"]);
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-green-300 hover:bg-green-400 text-gray-800 font-semibold w-full cursor-pointer mt-10 mb-4"
          onClick={() => setOpen(true)}
        >
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Fill in the product details below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-4  max-w-[398px]"
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
                  {name === "images" && Array.isArray(errors[name])
                    ? errors[name][0]?.message || "Invalid image URL"
                    : errors[name]?.message}
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

export default ProductDialogForm;
