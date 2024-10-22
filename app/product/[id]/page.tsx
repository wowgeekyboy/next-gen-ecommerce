import { Metadata } from 'next';
import ProductDetails from '@/components/ProductDetails';
import ProductSchema from '@/components/ProductSchema';
import { getProductById } from '@/lib/api';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(params.id);

  return {
    title: `${product.name} | NextGen E-commerce`,
    description: product.description,
    openGraph: {
      title: `${product.name} | NextGen E-commerce`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  return (
    <div>
      <ProductDetails product={product} />
      <ProductSchema product={product} />
    </div>
  );
}