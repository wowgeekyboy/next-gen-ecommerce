'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchProducts } from '@/features/products/productSlice';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error, currentPage, totalPages } = useSelector((state: RootState) => state.products);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}