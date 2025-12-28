import { Response } from 'express';
import * as admin from 'firebase-admin';
import { AuthRequest, verifyAuth, verifyAdmin } from '../middleware/auth';
import { successResponse, errorResponse, validationError } from '../utils/response';

const db = admin.firestore();
const PRODUCTS_COLLECTION = 'products';

/**
 * GET /products
 * Get all products with optional category filter
 */
export const getProducts = async (req: AuthRequest, res: Response) => {
    try {
        const { category, limit = '50' } = req.query;

        let query: admin.firestore.Query = db.collection(PRODUCTS_COLLECTION);

        // Apply category filter if provided
        if (category && category !== 'all') {
            query = query.where('category', '==', category);
        }

        // Order by creation date
        query = query.orderBy('createdAt', 'desc');

        // Apply limit
        const limitNum = parseInt(limit as string, 10);
        if (limitNum > 0 && limitNum <= 100) {
            query = query.limit(limitNum);
        }

        const snapshot = await query.get();

        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return successResponse(res, products);
    } catch (error) {
        console.error('Error getting products:', error);
        return errorResponse(res, 'Failed to fetch products', 500, error);
    }
};

/**
 * GET /products/:id
 * Get a single product by ID
 */
export const getProduct = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return validationError(res, ['Product ID is required']);
        }

        const doc = await db.collection(PRODUCTS_COLLECTION).doc(id).get();

        if (!doc.exists) {
            return errorResponse(res, 'Product not found', 404);
        }

        const product = {
            id: doc.id,
            ...doc.data()
        };

        return successResponse(res, product);
    } catch (error) {
        console.error('Error getting product:', error);
        return errorResponse(res, 'Failed to fetch product', 500, error);
    }
};

/**
 * POST /products
 * Create a new product (Admin only)
 */
export const createProduct = [
    verifyAuth,
    verifyAdmin,
    async (req: AuthRequest, res: Response) => {
        try {
            const {
                name,
                description,
                price,
                originalPrice,
                images,
                category,
                sellerId,
                sellerName,
                stock,
                variants,
                shipping
            } = req.body;

            // Validation
            const errors: string[] = [];
            if (!name) errors.push('Name is required');
            if (!description) errors.push('Description is required');
            if (price === undefined || price < 0) errors.push('Valid price is required');
            if (!images || images.length === 0) errors.push('At least one image is required');
            if (!category) errors.push('Category is required');
            if (!sellerId) errors.push('Seller ID is required');
            if (!sellerName) errors.push('Seller name is required');
            if (stock === undefined || stock < 0) errors.push('Valid stock quantity is required');
            if (!shipping) errors.push('Shipping information is required');

            if (errors.length > 0) {
                return validationError(res, errors);
            }

            const productData = {
                name,
                description,
                price,
                originalPrice: originalPrice || null,
                images,
                category,
                sellerId,
                sellerName,
                rating: 0,
                reviews: 0,
                stock,
                variants: variants || {},
                shipping,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await db.collection(PRODUCTS_COLLECTION).add(productData);

            return successResponse(res, { id: docRef.id, ...productData }, 201);
        } catch (error) {
            console.error('Error creating product:', error);
            return errorResponse(res, 'Failed to create product', 500, error);
        }
    }
];

/**
 * PUT /products/:id
 * Update a product (Admin only)
 */
export const updateProduct = [
    verifyAuth,
    verifyAdmin,
    async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                return validationError(res, ['Product ID is required']);
            }

            const docRef = db.collection(PRODUCTS_COLLECTION).doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return errorResponse(res, 'Product not found', 404);
            }

            const updates = { ...req.body };
            delete updates.id;
            delete updates.createdAt;

            updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();

            await docRef.update(updates);

            const updatedDoc = await docRef.get();
            const product = {
                id: updatedDoc.id,
                ...updatedDoc.data()
            };

            return successResponse(res, product);
        } catch (error) {
            console.error('Error updating product:', error);
            return errorResponse(res, 'Failed to update product', 500, error);
        }
    }
];

/**
 * DELETE /products/:id
 * Delete a product (Admin only)
 */
export const deleteProduct = [
    verifyAuth,
    verifyAdmin,
    async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                return validationError(res, ['Product ID is required']);
            }

            const docRef = db.collection(PRODUCTS_COLLECTION).doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return errorResponse(res, 'Product not found', 404);
            }

            await docRef.delete();

            return successResponse(res, { message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            return errorResponse(res, 'Failed to delete product', 500, error);
        }
    }
];

export const productHandlers = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
