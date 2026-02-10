import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { logger } from '../lib/logger.js';
import { waitlistSchema, WaitlistInput } from '../middleware/validation.js';
import { rateLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/waitlist/upsert', rateLimiter, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData: WaitlistInput = waitlistSchema.parse(req.body);
        const now = new Date();

        // Get client info
        const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || null;
        const userAgent = req.headers['user-agent'] || null;
        let referrer = req.headers['referer'] || req.headers['referrer'] || null;
        if (Array.isArray(referrer)) referrer = referrer[0];

        // Upsert user
        const user = await prisma.waitlistUser.upsert({
            where: { email: validatedData.email },
            update: {
                name: validatedData.name || undefined,
                meta: validatedData.meta ? JSON.stringify(validatedData.meta) : undefined,
                lastSeenAt: now,
            },
            create: {
                email: validatedData.email,
                name: validatedData.name || null,
                meta: validatedData.meta ? JSON.stringify(validatedData.meta) : null,
                lastSeenAt: now,
            },
        });

        // Create event
        await prisma.waitlistEvent.create({
            data: {
                userId: user.id,
                event: validatedData.event || 'signup',
                ip,
                userAgent,
                referrer,
            },
        });

        logger.info(`Waitlist user updated: ${user.id} (${user.email}) - event: ${validatedData.event || 'signup'}`);

        res.status(200).json({
            userId: user.id,
            email: user.email,
            lastSeenAt: user.lastSeenAt?.toISOString(),
        });
    } catch (error) {
        next(error);
    }
});

export default router;
