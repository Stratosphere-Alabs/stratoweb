import type { Metric } from 'web-vitals';

// 将 Web Vitals 指标上报到 Google Analytics
export function reportWebVitals(onPerfEntry?: (metric: Metric) => void) {
    if (onPerfEntry && import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
        import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
            onCLS(onPerfEntry);
            onINP(onPerfEntry); // INP 在 web-vitals v3+ 中取代 FID
            onFCP(onPerfEntry);
            onLCP(onPerfEntry);
            onTTFB(onPerfEntry);
        });
    }
}

// 将单个指标发送到 Google Analytics
export function sendToGoogleAnalytics(metric: Metric) {
    if (window.gtag && import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
        window.gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
        });
    }
}

// 初始化 Web Vitals 上报
export function initWebVitals() {
    reportWebVitals(sendToGoogleAnalytics);
}
