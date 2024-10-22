'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchOrders } from '@/features/orders/orderSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderHistoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, status, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading orders...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.map((order) => (
        <Card key={order._id} className="mb-4">
          <CardHeader>
            <CardTitle>Order #{order._id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${order.totalPrice.toFixed(2)}</p>
            <p>Status: {order.isPaid ? 'Paid' : 'Pending'}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}