'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/features/wishlist/wishlistSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { memo } from 'react';
import { RootState } from '@/lib/store';

const ProductCard = memo(function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item._id === product._id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        </div>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <Button variant="ghost" onClick={handleToggleWishlist}>
          <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
});

export default ProductCard;