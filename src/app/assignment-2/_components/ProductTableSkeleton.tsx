export function ProductTableSkeleton() {
  const skeletonRows = Array(5).fill(0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {["Image", "Title", "Price", "Category", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  className="border border-gray-200 px-4 py-2 text-center bg-gray-100"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, idx) => (
            <tr key={idx} className="border border-gray-200">
              <td className="border border-gray-200 px-4 py-2 text-center">
                <div className="mx-auto h-10 w-20 rounded bg-gray-300 animate-pulse" />
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                <div className="h-4 w-24 rounded bg-gray-300 animate-pulse mx-auto" />
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                <div className="h-4 w-12 rounded bg-gray-300 animate-pulse mx-auto" />
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                <div className="h-4 w-20 rounded bg-gray-300 animate-pulse mx-auto" />
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                <div className="flex justify-center space-x-2">
                  <div className="h-6 w-6 rounded bg-gray-300 animate-pulse" />
                  <div className="h-6 w-6 rounded bg-gray-300 animate-pulse" />
                  <div className="h-6 w-6 rounded bg-gray-300 animate-pulse" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
