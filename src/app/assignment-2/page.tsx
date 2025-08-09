import { Suspense } from "react";
import ProductWrapper from "./_components/ProductWrapper";

const AssignmentTwoPage = ({
  searchParams,
}: {
  searchParams: Promise<{ offset: string; limit: string }>;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductWrapper searchParams={searchParams} />
    </Suspense>
  );
};

export default AssignmentTwoPage;
