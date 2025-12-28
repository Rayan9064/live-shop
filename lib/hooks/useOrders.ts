'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { Order } from '@/lib/types';
import { getOrders, getOrder, createOrder, updateOrderStatus } from '@/lib/firestore';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
}

interface UseOrderReturn {
  order: Order | null;
  loading: boolean;
  error: string | null;
  fetchOrder: (orderId: string) => Promise<void>;
}

interface UseCreateOrderReturn {
  createOrder: (order: Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export function useOrders(): UseOrdersReturn {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (): Promise<void> => {
    if (!user) {
      setOrders([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const fetchedOrders = await getOrders(user.uid);
      setOrders(fetchedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
  };
}

export function useOrder(orderId?: string): UseOrderReturn {
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async (id: string): Promise<void> => {
    if (!user) {
      setError('You must be logged in to view orders');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const fetchedOrder = await getOrder(id, user.uid);
      setOrder(fetchedOrder);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order');
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId, fetchOrder]);

  return {
    order,
    loading,
    error,
    fetchOrder,
  };
}

export function useCreateOrder(): UseCreateOrderReturn {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewOrder = useCallback(async (
    orderData: Omit<Order, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<string | null> => {
    if (!user) {
      setError('You must be logged in to create orders');
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const orderId = await createOrder({
        ...orderData,
        userId: user.uid,
      });
      return orderId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      console.error('Error creating order:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    createOrder: createNewOrder,
    loading,
    error,
  };
}