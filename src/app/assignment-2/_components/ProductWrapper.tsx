import Products from "./Products";
import { fetchCategories, fetchProducts, fetchTotalLength } from "./utils";

const ProductWrapper = async ({
  searchParams,
}: {
  searchParams: Promise<{ offset: string; limit: string }>;
}) => {
  const { offset, limit } = await searchParams;
  const { totalLength } = await fetchTotalLength();
  const { data: categories } = await fetchCategories();
  const { data, error } = await fetchProducts(offset, limit);

  if (!data || error || totalLength < 1 || !categories) return null;

  if (!data || error || totalLength < 1 || !categories) return null;
  return (
    <Products
      products={data}
      totalLength={totalLength}
      categories={categories}
    />
  );
};

export default ProductWrapper;
