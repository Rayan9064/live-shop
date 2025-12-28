import { db } from './firebaseConfig';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { Product, Order, CartItem, Address } from './types';

// Products Collection
const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';
const CART_COLLECTION = 'cart';
const ADDRESSES_COLLECTION = 'addresses';

// Helper function to convert Firestore timestamp to Date
const timestampToDate = (timestamp: Timestamp | Date): Date => {
  return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
};

// Products CRUD Operations
export const getProducts = async (limit?: number, category?: string): Promise<Product[]> => {
  try {
    let q = query(collection(db, PRODUCTS_COLLECTION));

    if (category && category !== 'all') {
      q = query(q, where('category', '==', category));
    }

    q = query(q, orderBy('createdAt', 'desc'));

    if (limit) {
      q = query(q, firestoreLimit(limit));
    }

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Product;
    });
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const getProduct = async (productId: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Product;
    }

    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (productId: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Orders CRUD Operations
export const getOrders = async (userId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Order;
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

export const getOrder = async (orderId: string, userId: string): Promise<Order | null> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().userId === userId) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Order;
    }

    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Cart Operations (using user's cart subcollection)
export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  try {
    const q = query(
      collection(db, 'users', userId, CART_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as CartItem;
    });
  } catch (error) {
    console.error('Error getting cart items:', error);
    throw error;
  }
};

export const addToCart = async (userId: string, cartItem: Omit<CartItem, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, CART_COLLECTION), {
      ...cartItem,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (userId: string, itemId: string, updates: Partial<CartItem>): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId, CART_COLLECTION, itemId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (userId: string, itemId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId, CART_COLLECTION, itemId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async (userId: string): Promise<void> => {
  try {
    const cartItems = await getCartItems(userId);
    const deletePromises = cartItems.map(item => removeFromCart(userId, item.id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Address Operations
export const getAddresses = async (userId: string): Promise<Address[]> => {
  try {
    const q = query(
      collection(db, 'users', userId, ADDRESSES_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Address;
    });
  } catch (error) {
    console.error('Error getting addresses:', error);
    throw error;
  }
};

export const addAddress = async (userId: string, address: Omit<Address, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, ADDRESSES_COLLECTION), {
      ...address,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding address:', error);
    throw error;
  }
};

export const updateAddress = async (userId: string, addressId: string, updates: Partial<Address>): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId, ADDRESSES_COLLECTION, addressId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

export const deleteAddress = async (userId: string, addressId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId, ADDRESSES_COLLECTION, addressId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

export const setDefaultAddress = async (userId: string, addressId: string): Promise<void> => {
  try {
    // First, unset all addresses as default
    const addresses = await getAddresses(userId);
    const unsetPromises = addresses.map(addr =>
      updateAddress(userId, addr.id, { isDefault: false })
    );
    await Promise.all(unsetPromises);

    // Then set the selected address as default
    await updateAddress(userId, addressId, { isDefault: true });
  } catch (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
};