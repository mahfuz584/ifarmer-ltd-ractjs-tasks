const ProductDetailSkeleton = () => (
  <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10 bg-white rounded shadow-lg animate-pulse">
    <div className="md:w-1/2 flex flex-col gap-4">
      <div className="relative w-full h-[400px] rounded-lg bg-gray-300" />
      <div className="flex gap-3 overflow-x-auto">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="relative w-20 h-20 rounded bg-gray-300 flex-shrink-0 border border-gray-300"
          />
        ))}
      </div>
    </div>
    <div className="md:w-1/2 flex flex-col justify-between space-y-6">
      <div>
        <div className="h-12 w-3/4 bg-gray-300 rounded mb-4" />
        <div className="h-8 w-1/4 bg-gray-300 rounded mb-6" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 rounded" />
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-md bg-gray-300 border border-gray-300" />
          <div className="space-y-1 flex flex-col justify-center">
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-6 w-32 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetailSkeleton;
