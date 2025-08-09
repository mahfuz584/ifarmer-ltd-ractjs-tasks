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
import { Pencil, TrashIcon } from "lucide-react";
import Image from "next/image";
import { ProductListResponse } from "./types";

export function ProductTable({ products }: { products: ProductListResponse }) {
  return (
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
        {products.map((product) => {
          return (
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
                <Button
                  aria-label={`Edit ${product.title}`}
                  className="text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200"
                >
                  <Pencil className="h-5 w-5" />
                </Button>
                <Button
                  aria-label={`Delete ${product.title}`}
                  className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200"
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
