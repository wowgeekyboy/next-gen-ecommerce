'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { clearCart } from '@/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  // ... (previous code)

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit}>
        {/* ... (previous form fields) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment</h2>
          <CheckoutForm amount={totalPrice * 100} /> {/* Stripe expects amount in cents */}
        </div>
      </form>
    </div>
  );
}