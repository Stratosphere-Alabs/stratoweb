import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../lib/logger.js';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error('Error:', err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            details: err.errors,
        });
    }

    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            error: 'CORS error',
            message: 'Origin not allowed',
        });
    }

    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    });
};
