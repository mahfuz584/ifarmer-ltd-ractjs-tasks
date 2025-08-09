import Products from "./Products";
import { fetchProducts, fetchTotalLength } from "./utils";

const ProductWrapper = async ({
  searchParams,
}: {
  searchParams: Promise<{ offset: string; limit: string }>;
}) => {
  const { offset, limit } = await searchParams;
  const { totalLength } = await fetchTotalLength();
  const { data, error } = await fetchProducts(offset, limit);

  if (!data || error) return null;

  return <Products products={data} totalLength={totalLength} />;
};

export default ProductWrapper;
