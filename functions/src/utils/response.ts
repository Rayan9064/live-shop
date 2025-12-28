import { Response } from 'express';

export const successResponse = (res: Response, data: any, statusCode: number = 200) => {
    return res.status(statusCode).json({
        success: true,
        data
    });
};

export const errorResponse = (
    res: Response,
    message: string,
    statusCode: number = 500,
    error?: any
) => {
    const response: any = {
        success: false,
        error: message
    };

    if (process.env.NODE_ENV === 'development' && error) {
        response.details = error.message || error;
    }

    return res.status(statusCode).json(response);
};

export const validationError = (res: Response, errors: string[]) => {
    return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
    });
};
