"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import { PaginationProps } from "./types";

const Pagination = ({ totalItems, defaultLimit }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const offset = Number(searchParams.get("offset")) || 0;
  const limit = Number(searchParams.get("limit")) || defaultLimit;

  const pageCount = Math.ceil(totalItems / limit);
  const currentPage = Math.floor(offset / limit);

  function handlePageClick(selectedItem: { selected: number }) {
    const newOffset = selectedItem.selected * limit;

    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", String(newOffset));
    params.set("limit", String(limit));

    router.push(`?${params.toString()}`);
  }

  return (
    <ReactPaginate
      previousLabel="Prev"
      nextLabel="Next"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName="flex gap-2 justify-center items-center mt-auto"
      pageClassName="cursor-pointer px-3 py-1 border rounded"
      activeClassName="bg-blue-500 text-white"
      forcePage={currentPage}
    />
  );
};

export default Pagination;
