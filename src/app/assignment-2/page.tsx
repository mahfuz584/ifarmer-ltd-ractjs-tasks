import { Suspense } from "react";
import { ProductTableSkeleton } from "./_components/ProductTableSkeleton";
import ProductWrapper from "./_components/ProductWrapper";

const AssignmentTwoPage = ({
  searchParams,
}: {
  searchParams: Promise<{ offset: string; limit: string }>;
}) => {
  return (
    <Suspense fallback={<ProductTableSkeleton />}>
      <ProductWrapper searchParams={searchParams} />
    </Suspense>
  );
};

export default AssignmentTwoPage;
