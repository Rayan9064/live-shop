import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

/**
 * Middleware to verify Firebase Auth token
 */
export const verifyAuth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Missing or invalid authorization header'
            });
            return;
        }

        const token = authHeader.split('Bearer ')[1];

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        } catch (error) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid or expired token'
            });
            return;
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error verifying authentication'
        });
        return;
    }
};

/**
 * Middleware to verify admin role
 */
export const verifyAdmin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Authentication required'
            });
            return;
        }

        // Check if user has admin custom claim
        const userRecord = await admin.auth().getUser(req.user.uid);
        const isAdmin = userRecord.customClaims?.admin === true;

        if (!isAdmin) {
            res.status(403).json({
                error: 'Forbidden',
                message: 'Admin access required'
            });
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error verifying admin status'
        });
        return;
    }
};
