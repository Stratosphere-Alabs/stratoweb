import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './lib/logger.js';
import healthRouter from './routes/health.js';
import inquiriesRouter from './routes/inquiries.js';
import waitlistRouter from './routes/waitlist.js';
import adminRouter from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = '127.0.0.1'; // Only listen on localhost

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Serve static admin UI files
app.use('/admin', express.static(path.join(__dirname, '../public-admin')));

// Routes
app.use('/', healthRouter);
app.use('/', inquiriesRouter);
app.use('/', waitlistRouter);
app.use('/', adminRouter);

// Error handling
app.use(errorHandler);

// Start server
app.listen(Number(PORT), HOST, () => {
    logger.info(`Server running on http://${HOST}:${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`CORS origins: ${process.env.CORS_ORIGINS}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});
