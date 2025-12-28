import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import { productHandlers } from './products/handlers';

// Initialize Firebase Admin
admin.initializeApp();

// Create Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Product routes
app.get('/products', productHandlers.getProducts);
app.get('/products/:id', productHandlers.getProduct);
app.post('/products', productHandlers.createProduct);
app.put('/products/:id', productHandlers.updateProduct);
app.delete('/products/:id', productHandlers.deleteProduct);

// Export the Express app as a Cloud Function
export const api = functions.https.onRequest(app);
