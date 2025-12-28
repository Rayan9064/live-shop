'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { CartItem } from '@/lib/types';
import { 
  getCartItems, 
  addToCart, 
  updateCartItem, 
  removeFromCart,
  clearCart as clearCartFromFirestore 
} from '@/lib/firestore';

interface UseCartReturn {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  updateItem: (itemId: string, updates: Partial<CartItem>) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

export function useCart(): UseCartReturn {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const items = await getCartItems(user.uid);
      setCartItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart items');
      console.error('Error fetching cart items:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addItem = async (item: Omit<CartItem, 'id'>): Promise<void> => {
    if (!user) {
      setError('You must be logged in to add items to cart');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await addToCart(user.uid, item);
      await fetchCartItems(); // Refresh cart after adding
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      console.error('Error adding item to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId: string, updates: Partial<CartItem>): Promise<void> => {
    if (!user) {
      setError('You must be logged in to update cart items');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await updateCartItem(user.uid, itemId, updates);
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item');
      console.error('Error updating cart item:', err);
      await fetchCartItems(); // Refresh cart on error
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string): Promise<void> => {
    if (!user) {
      setError('You must be logged in to remove items from cart');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await removeFromCart(user.uid, itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item from cart');
      console.error('Error removing item from cart:', err);
      await fetchCartItems(); // Refresh cart on error
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (): Promise<void> => {
    if (!user) {
      setError('You must be logged in to clear cart');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await clearCartFromFirestore(user.uid);
      setCartItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      console.error('Error clearing cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = async (): Promise<void> => {
    await fetchCartItems();
  };

  return {
    cartItems,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart,
  };
}