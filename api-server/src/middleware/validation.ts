import { z } from 'zod';

// Inquiry schema - accepts both sourcePage (camelCase) and source_page (snake_case)
// for backward compatibility. Both map to the same database field.
export const inquirySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    company: z.string().optional(),
    message: z.string().min(5, 'Message must be at least 5 characters'),
    sourcePage: z.string().optional(),
    source_page: z.string().optional(),
}).transform((data) => {
    // Normalize: if both are provided, sourcePage takes precedence
    // If only source_page is provided, copy it to sourcePage
    const sourcePage = data.sourcePage || data.source_page;
    return {
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
        sourcePage,
    };
});

export const waitlistSchema = z.object({
    email: z.string().email('Invalid email format'),
    name: z.string().optional(),
    meta: z.record(z.any()).optional(),
    event: z.enum(['signup', 'login', 'visit']).optional().default('signup'),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type WaitlistInput = z.infer<typeof waitlistSchema>;
