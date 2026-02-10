import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { logger } from '../lib/logger.js';
import { inquirySchema, InquiryInput } from '../middleware/validation.js';
import { rateLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/inquiries', rateLimiter, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData: InquiryInput = inquirySchema.parse(req.body);

        const inquiry = await prisma.inquiry.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                company: validatedData.company || null,
                message: validatedData.message,
                sourcePage: validatedData.sourcePage || null,
            },
        });

        logger.info(`New inquiry created: ${inquiry.id} from ${inquiry.email}`);

        res.status(201).json({
            id: inquiry.id,
            createdAt: inquiry.createdAt.toISOString(),
        });
    } catch (error) {
        next(error);
    }
});

export default router;
