import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.json({
        ok: true,
        time: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development',
    });
});

export default router;
