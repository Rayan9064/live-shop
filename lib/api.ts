import { auth } from './firebaseConfig';

// Base URL for Cloud Functions
const FUNCTIONS_BASE_URL = process.env.NEXT_PUBLIC_FUNCTIONS_URL ||
    'http://localhost:5001/live-shop-8d7a0/us-central1/api';

/**
 * Get the current user's auth token
 */
const getAuthToken = async (): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;

    try {
        return await user.getIdToken();
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

/**
 * Make an authenticated API request
 */
const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const token = await getAuthToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // Add existing headers from options
    if (options.headers) {
        const existingHeaders = new Headers(options.headers);
        existingHeaders.forEach((value, key) => {
            headers[key] = value;
        });
    }

    // Add auth token if available
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${FUNCTIONS_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({
            error: 'Request failed',
            message: response.statusText
        }));
        throw new Error(error.message || error.error || 'Request failed');
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Product API
 */
export const productApi = {
    /**
     * Get all products
     */
    getAll: async (params?: { category?: string; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.category) queryParams.append('category', params.category);
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const query = queryParams.toString();
        const endpoint = `/products${query ? `?${query}` : ''}`;

        return apiRequest(endpoint);
    },

    /**
     * Get a single product by ID
     */
    getById: async (id: string) => {
        return apiRequest(`/products/${id}`);
    },

    /**
     * Create a new product (Admin only)
     */
    create: async (productData: any) => {
        return apiRequest('/products', {
            method: 'POST',
            body: JSON.stringify(productData),
        });
    },

    /**
     * Update a product (Admin only)
     */
    update: async (id: string, updates: any) => {
        return apiRequest(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    },

    /**
     * Delete a product (Admin only)
     */
    delete: async (id: string) => {
        return apiRequest(`/products/${id}`, {
            method: 'DELETE',
        });
    },
};

/**
 * Health check
 */
export const healthCheck = async () => {
    return apiRequest('/health');
};
