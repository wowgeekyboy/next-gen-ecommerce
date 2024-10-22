'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeFromWishlist } from '@/features/wishlist/wishlistSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function WishlistPage() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product._id));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item._id} className="border rounded-lg p-4">
              <Image src={item.image} alt={item.name} width={200} height={200} className="mb-4" />
              <h3 className="font-semibold">{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="mt-4 flex justify-between">
                <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                <Button variant="outline" onClick={() => handleRemoveFromWishlist(item._id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}