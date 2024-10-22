'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { removeFromCart, updateQuantity } from '@/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                  className="w-16 mr-4"
                />
                <Button variant="destructive" onClick={() => handleRemoveItem(item._id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}<div className="mt-6">
              <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
              <Button className="mt-4">Proceed to Checkout</Button>
            </div>
          </>
        )}
      </div>
    );
  }