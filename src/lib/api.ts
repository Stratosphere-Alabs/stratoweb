// SF 首页后端 API 客户端

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface InquiryData {
    name: string;
    email: string;
    company?: string;
    message: string;
    sourcePage?: string;
}

export interface WaitlistData {
    email: string;
    name?: string;
    meta?: Record<string, unknown>;
    event?: 'signup' | 'login' | 'visit';
}

export interface InquiryResponse {
    id: string;
    createdAt: string;
}

export interface WaitlistResponse {
    userId: string;
    email: string;
    lastSeenAt?: string;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        // 去掉 baseUrl 尾斜杠与 endpoint 头斜杠，避免出现双斜杠
        const cleanBaseUrl = this.baseUrl.replace(/\/$/, '');
        const cleanEndpoint = endpoint.replace(/^\//, '');
        const url = `${cleanBaseUrl}/${cleanEndpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            try {
                const data: unknown = JSON.parse(text);

                // 针对 Zod 校验错误的增强处理
                if (isRecord(data) && Array.isArray(data.details)) {
                    const messages = data.details
                        .filter(isValidationErrorDetail)
                        .map((err) => `${err.path.join('.')}: ${err.message}`)
                        .join(', ');
                    throw new Error(
                        messages ||
                        asString(data.error) ||
                        asString(data.message) ||
                        `Request failed (${response.status})`
                    );
                }

                if (isRecord(data)) {
                    throw new Error(
                        asString(data.error) ||
                        asString(data.message) ||
                        `Request failed (${response.status})`
                    );
                }

                throw new Error(`Request failed (${response.status})`);
            } catch (e: unknown) {
                // 若捕获的已是增强后的错误，直接抛出
                if (
                    e instanceof Error &&
                    e.message &&
                    e.message !== `Request failed (${response.status})` &&
                    text &&
                    text.includes(e.message)
                ) {
                    throw e;
                }
                // 其它情况（如 JSON 解析失败）用原始文本或状态码抛出
                throw new Error(text || `Request failed (${response.status})`);
            }
        }

        return response.json();
    }

    async checkHealth(): Promise<{ ok: boolean; time: string }> {
        return this.request('/health');
    }

    async submitInquiry(data: InquiryData): Promise<InquiryResponse> {
        return this.request('/inquiries', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async joinWaitlist(data: WaitlistData): Promise<WaitlistResponse> {
        return this.request('/waitlist/upsert', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

type ValidationErrorDetail = {
    path: Array<string | number>;
    message: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;

const asString = (value: unknown): string | undefined =>
    typeof value === 'string' && value.length > 0 ? value : undefined;

const isValidationErrorDetail = (value: unknown): value is ValidationErrorDetail => {
    if (!isRecord(value)) return false;
    return Array.isArray(value.path) && typeof value.message === 'string';
};

export const api = new ApiClient(API_BASE_URL);
