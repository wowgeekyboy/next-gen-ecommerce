'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchRecommendations } from '@/features/recommendations/recommendationSlice';
import ProductCard from '@/components/ProductCard';

export default function Recommendations() {
  const dispatch = useDispatch<AppDispatch>();
  const { recommendations, status, error } = useSelector((state: RootState) => state.recommendations);
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (user && status === 'idle') {
      dispatch(fetchRecommendations());
    }
  }, [status, dispatch, user]);

  if (!user) {
    return null;
  }

  if (status === 'loading') {
    return <div>Loading recommendations...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}