import { Suspense } from "react";
import ProductDetailSkeleton from "./_components/ProductDetailSkeleton";
import ProductDetailsWrapper from "./_components/ProductDetialsWrapper";

const ProductPageDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailsWrapper params={params} />
    </Suspense>
  );
};

export default ProductPageDetailsPage;
