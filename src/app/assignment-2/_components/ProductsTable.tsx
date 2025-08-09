"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Category, ProductListResponse } from "./types";

import { revalidateTags } from "@/actions";
import { useDeleteProductMutation } from "@/redux/query/productsQuery";
import { useRouter } from "next/navigation";
import UpdateProductDialogForm from "./UpdateProductDialogForm";

export function ProductTable({
  products,
  categories,
}: {
  products: ProductListResponse;
  categories: Category[];
}) {
  const router = useRouter();
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleClickDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const response = await deleteProduct(id);

      if (response.error && "data" in response.error) {
        alert("Failed to delete product");
      }

      alert("Product deleted successfully");
      revalidateTags(["products"]);
      router.refresh();
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-muted">
              <TableCell className="relative w-20 h-10">
                <Image
                  priority
                  width={80}
                  height={80}
                  src={product.images[0]}
                  alt={product.title}
                  className="rounded"
                />
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="flex items-center justify-center gap-2 mt-3">
                <Link href={`/assignment-2/${product.id}`} passHref>
                  <Button
                    aria-label={`View ${product.title}`}
                    className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 cursor-pointer"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </Link>

                <Button
                  aria-label={`Edit ${product.title}`}
                  onClick={() => setEditingProductId(product.id)}
                  className="text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 cursor-pointer"
                >
                  <Pencil className="h-5 w-5" />
                </Button>

                <Button
                  aria-label={`Delete ${product.title}`}
                  disabled={isDeleting}
                  onClick={() => handleClickDelete(product.id)}
                  className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 cursor-pointer"
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingProductId && (
        <UpdateProductDialogForm
          categories={categories}
          products={products}
          productId={editingProductId}
          onClose={() => setEditingProductId(null)}
        />
      )}
    </>
  );
}
