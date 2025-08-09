"use client";

import Pagination from "./Pagination";
import { ProductTable } from "./ProductsTable";
import { ProductListResponse } from "./types";

const DEFAULT_LIMIT = 10;

export default function Products({
  products,
  totalLength,
}: {
  totalLength: number;
  products: ProductListResponse;
}) {
  return (
    <>
      <ProductTable products={products} />
      <Pagination defaultLimit={DEFAULT_LIMIT} totalItems={totalLength} />
    </>
  );
}
