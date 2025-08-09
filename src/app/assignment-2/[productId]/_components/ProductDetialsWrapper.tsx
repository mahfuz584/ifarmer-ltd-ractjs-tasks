import Image from "next/image";
import { fetchProductById } from "../../_components/utils";

const ProductDetailsWrapper = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: product, error } = await fetchProductById(productId);

  if (error || !product) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10 bg-white rounded shadow-lg">
      <div className="md:w-1/2 flex flex-col gap-4">
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="flex gap-3 overflow-x-auto">
          {product.images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 rounded overflow-hidden border border-gray-300 flex-shrink-0 cursor-pointer"
            >
              <Image
                src={img}
                alt={`${product.title} image ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right side: product info */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-green-700 text-2xl font-semibold mt-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-6 text-gray-700 whitespace-pre-line">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-md border overflow-hidden">
              <Image
                src={product.category.image}
                alt={product.category.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <p className="text-sm uppercase text-gray-500 tracking-wide">
                Category
              </p>
              <p className="font-semibold text-lg">{product.category.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsWrapper;
