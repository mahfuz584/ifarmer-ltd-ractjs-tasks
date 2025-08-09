import { API_BASE_URL } from "@/lib/baseUrls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  RequestBodyProduct,
  ResponseProduct,
  RetrieveProductPayload,
} from "./types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    createProduct: build.mutation<ResponseProduct, RequestBodyProduct>({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<
      ResponseProduct,
      { id: number; data: RetrieveProductPayload }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
