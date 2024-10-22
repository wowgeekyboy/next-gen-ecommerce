import ProductList from '@/components/ProductList';
import Recommendations from '@/components/Recommendations';

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to NextGen Shop</h1>
      <Recommendations />
      <h2 className="text-3xl font-bold my-8">Our Products</h2>
      <ProductList />
    </div>
  );
}