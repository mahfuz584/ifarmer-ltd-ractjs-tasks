import { API_BASE_URL } from "@/lib/baseUrls";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import {
  Category,
  Product,
  ProductListResponse,
  TotalLengthResponse,
} from "./types";

export async function fetchPublic<T, E = unknown>(
  url: string,
  params?: Record<string, string | number | boolean>,
  init?: RequestInit
) {
  const fullUrl = new URL(`${API_BASE_URL}${url}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fullUrl.searchParams.set(key, String(value));
      }
    });
  }

  try {
    const response = await fetch(fullUrl.toString(), init);

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as E;
      return {
        data: null as T | null,
        error: errorBody ?? (response.statusText as E),
      };
    }

    const data = (await response.json()) as T;
    return { data, error: null as E | null };
  } catch (err) {
    return { data: null as T | null, error: err as E };
  }
}

export const fetchProducts = async (
  offset: string = "0",
  limit: string = "10"
): Promise<{ data: ProductListResponse | null; error: Error | null }> => {
  "use cache";
  cacheLife("days");
  cacheTag("products");

  return fetchPublic<ProductListResponse, Error>("/products", {
    offset,
    limit,
  });
};

export const fetchCategories = async (): Promise<{
  data: Category[] | null;
  error: Error | null;
}> => {
  "use cache";
  cacheLife("days");
  cacheTag("products");

  return fetchPublic<Category[], Error>("/categories");
};

export const fetchProductById = async (
  id: string
): Promise<{ data: Product | null; error: Error | null }> => {
  "use cache";
  cacheLife("days");
  cacheTag("products");

  return fetchPublic<Product, Error>(`/products/${id}`);
};

export const fetchTotalLength = async (): Promise<TotalLengthResponse> => {
  "use cache";
  cacheLife("days");
  cacheTag("products");

  const response = await fetch(`${API_BASE_URL}/products`);
  const data = await response.json();

  const length = Array.isArray(data) ? data.length : 0;

  return { totalLength: length };
};
