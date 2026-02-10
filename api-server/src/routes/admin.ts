import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { logger } from '../lib/logger.js';

const router = Router();

const MAX_LIMIT = 200;
const DEFAULT_LIMIT = 50;

// Helper to parse and validate pagination params
function getPaginationParams(req: Request): { limit: number; offset: number; q?: string } {
    const limit = Math.min(Math.max(1, parseInt(req.query.limit as string) || DEFAULT_LIMIT), MAX_LIMIT);
    const offset = Math.max(0, parseInt(req.query.offset as string) || 0);
    const q = req.query.q as string | undefined;
    return { limit, offset, q };
}

// Helper to escape CSV fields
function escapeCsv(value: any): string {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

// Helper to convert array of objects to CSV
function arrayToCsv(headers: string[], rows: any[][]): string {
    const csvHeaders = headers.join(',');
    const csvRows = rows.map(row => row.map(escapeCsv).join(',')).join('\n');
    return `${csvHeaders}\n${csvRows}`;
}

// GET /admin-api/inquiries
router.get('/admin-api/inquiries', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, offset, q } = getPaginationParams(req);

        const where = q
            ? {
                OR: [
                    { email: { contains: q } },
                    { name: { contains: q } },
                ],
            }
            : {};

        const [items, total] = await Promise.all([
            prisma.inquiry.findMany({
                where,
                take: limit,
                skip: offset,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.inquiry.count({ where }),
        ]);

        logger.info(`Admin API: Listed ${items.length} inquiries (total: ${total})`);

        res.json({
            total,
            limit,
            offset,
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                email: item.email,
                company: item.company,
                message: item.message,
                source_page: item.sourcePage,
                created_at: item.createdAt.toISOString(),
            })),
        });
    } catch (error) {
        next(error);
    }
});

// GET /admin-api/waitlist-users
router.get('/admin-api/waitlist-users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, offset, q } = getPaginationParams(req);

        const where = q
            ? {
                OR: [
                    { email: { contains: q } },
                    { name: { contains: q } },
                ],
            }
            : {};

        const [items, total] = await Promise.all([
            prisma.waitlistUser.findMany({
                where,
                take: limit,
                skip: offset,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.waitlistUser.count({ where }),
        ]);

        logger.info(`Admin API: Listed ${items.length} waitlist users (total: ${total})`);

        res.json({
            total,
            limit,
            offset,
            items: items.map(item => ({
                id: item.id,
                email: item.email,
                name: item.name,
                meta: item.meta,
                last_seen_at: item.lastSeenAt?.toISOString(),
                created_at: item.createdAt.toISOString(),
            })),
        });
    } catch (error) {
        next(error);
    }
});

// GET /admin-api/waitlist-events
router.get('/admin-api/waitlist-events', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, offset, q } = getPaginationParams(req);

        const where = q
            ? {
                user: {
                    email: { contains: q },
                },
            }
            : {};

        const [items, total] = await Promise.all([
            prisma.waitlistEvent.findMany({
                where,
                take: limit,
                skip: offset,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: { email: true },
                    },
                },
            }),
            prisma.waitlistEvent.count({ where }),
        ]);

        logger.info(`Admin API: Listed ${items.length} waitlist events (total: ${total})`);

        res.json({
            total,
            limit,
            offset,
            items: items.map(item => ({
                id: item.id,
                event: item.event,
                user_email: item.user.email,
                ip: item.ip,
                user_agent: item.userAgent,
                referrer: item.referrer,
                created_at: item.createdAt.toISOString(),
            })),
        });
    } catch (error) {
        next(error);
    }
});

// GET /admin-api/export/inquiries.csv
router.get('/admin-api/export/inquiries.csv', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inquiries = await prisma.inquiry.findMany({
            orderBy: { createdAt: 'desc' },
        });

        const headers = ['id', 'name', 'email', 'company', 'message', 'source_page', 'created_at'];
        const rows = inquiries.map(item => [
            item.id,
            item.name,
            item.email,
            item.company || '',
            item.message,
            item.sourcePage || '',
            item.createdAt.toISOString(),
        ]);

        const csv = arrayToCsv(headers, rows);

        logger.info(`Admin API: Exported ${inquiries.length} inquiries to CSV`);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="inquiries.csv"');
        res.send(csv);
    } catch (error) {
        next(error);
    }
});

// GET /admin-api/export/waitlist-users.csv
router.get('/admin-api/export/waitlist-users.csv', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.waitlistUser.findMany({
            orderBy: { createdAt: 'desc' },
        });

        const headers = ['id', 'email', 'name', 'meta', 'last_seen_at', 'created_at'];
        const rows = users.map(item => [
            item.id,
            item.email,
            item.name || '',
            item.meta || '',
            item.lastSeenAt?.toISOString() || '',
            item.createdAt.toISOString(),
        ]);

        const csv = arrayToCsv(headers, rows);

        logger.info(`Admin API: Exported ${users.length} waitlist users to CSV`);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="waitlist-users.csv"');
        res.send(csv);
    } catch (error) {
        next(error);
    }
});

// GET /admin-api/export/waitlist-events.csv
router.get('/admin-api/export/waitlist-events.csv', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await prisma.waitlistEvent.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { email: true },
                },
            },
        });

        const headers = ['id', 'event', 'user_email', 'ip', 'user_agent', 'referrer', 'created_at'];
        const rows = events.map(item => [
            item.id,
            item.event,
            item.user.email,
            item.ip || '',
            item.userAgent || '',
            item.referrer || '',
            item.createdAt.toISOString(),
        ]);

        const csv = arrayToCsv(headers, rows);

        logger.info(`Admin API: Exported ${events.length} waitlist events to CSV`);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="waitlist-events.csv"');
        res.send(csv);
    } catch (error) {
        next(error);
    }
});

export default router;
