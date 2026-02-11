// Google Analytics 事件跟踪工具

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

interface EventParams {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
}

/**
 * 将自定义事件发送到 Google Analytics
 */
export const trackEvent = (
    eventName: string,
    params?: EventParams
): void => {
    if (window.gtag && import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
        window.gtag('event', eventName, params);
    }

    // 开发环境额外打印日志，便于调试
    if (import.meta.env.DEV) {
        console.log('[Analytics] Event tracked:', eventName, params);
    }
};

/**
 * 预置的一些事件封装
 */

// 提交等待名单表单
export const trackWaitlistSubmit = (email?: string) => {
    trackEvent('waitlist_submit', {
        category: 'User Engagement',
        label: email ? 'with_email' : 'no_email',
    });
};

// 点击“联系销售”
export const trackContactSalesClick = (source?: string) => {
    trackEvent('contact_sales_click', {
        category: 'Lead Generation',
        label: source || 'unknown',
    });
};

// 点击模型卡片
export const trackModelView = (modelId: string, modelName?: string) => {
    trackEvent('model_view', {
        category: 'Model Engagement',
        label: modelName || modelId,
        value: 1,
    });
};

// 进行模型对比
export const trackModelComparison = (modelIds: string[]) => {
    trackEvent('model_comparison', {
        category: 'Model Engagement',
        label: modelIds.join(','),
        value: modelIds.length,
    });
};

// 浏览文档页面
export const trackDocPageView = (pageName: string) => {
    trackEvent('doc_page_view', {
        category: 'Documentation',
        label: pageName,
    });
};

// 查看 API 参考区块
export const trackApiReferenceView = (apiName: string) => {
    trackEvent('api_reference_view', {
        category: 'Documentation',
        label: apiName,
    });
};

// 点击 CTA 按钮
export const trackCTAClick = (ctaName: string, location?: string) => {
    trackEvent('cta_click', {
        category: 'Conversion',
        label: `${ctaName}${location ? ` - ${location}` : ''}`,
    });
};

// 表单交互
export const trackFormStart = (formName: string) => {
    trackEvent('form_start', {
        category: 'Form Interaction',
        label: formName,
    });
};

export const trackFormSubmit = (formName: string, success: boolean) => {
    trackEvent('form_submit', {
        category: 'Form Interaction',
        label: formName,
        value: success ? 1 : 0,
    });
};

// 错误上报（非致命）
export const trackError = (errorType: string, errorMessage?: string) => {
    trackEvent('app_error', {
        category: 'Error',
        label: `${errorType}${errorMessage ? `: ${errorMessage.substring(0, 100)}` : ''}`,
    });
};
