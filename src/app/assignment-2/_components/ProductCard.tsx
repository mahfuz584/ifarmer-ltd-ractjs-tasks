import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./types";

function truncateWords(text: string, wordLimit: number) {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}

export function ProductCard({ product }: { product: Product }) {
  const wordLimit = 20;
  const isTruncated = product.description.split(" ").length > wordLimit;
  const truncatedDescription = truncateWords(product.description, wordLimit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          priority
          width={250}
          height={250}
          alt={product.title}
          src={product.images[0]}
          className="object-cover rounded-md mb-2 mx-auto"
        />
        <p className="mb-2">
          {isTruncated ? truncatedDescription : product.description}
        </p>
        {isTruncated && (
          <Link href={`/products/${product.id}`}>
            <p className="text-green-600 hover:underline">Continue reading</p>
          </Link>
        )}
        <p className="font-semibold">${product.price}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {product.category.name}
        </p>
      </CardContent>
    </Card>
  );
}
