import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const CookieConsent: React.FC = () => {
    const { lang } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 检查用户是否已做出过 Cookie 选择
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // 稍作延迟再显示弹窗
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);

        // 可选：关闭分析事件
        if (window.gtag) {
            // 调用 gtag 的同意 API
            (window.gtag as (...args: unknown[]) => void)('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
            <div className="mx-auto max-w-6xl">
                <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {lang === "ja" ? "Cookie の使用について" : "Cookie Usage"}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {lang === "ja" ? (
                                    <>
                                        当サイトでは、サービスの改善や利用状況の分析のため Cookie を使用しています。
                                        詳細については
                                        <Link to="/legal/privacy" className="text-blue-600 hover:underline mx-1">
                                            プライバシーポリシー
                                        </Link>
                                        をご覧ください。
                                    </>
                                ) : (
                                    <>
                                        We use cookies to improve our service and analyze usage. For more information, please see our
                                        <Link to="/legal/privacy" className="text-blue-600 hover:underline mx-1">
                                            Privacy Policy
                                        </Link>.
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20 whitespace-nowrap"
                            >
                                {lang === "ja" ? "同意する" : "Accept"}
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-all hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                {lang === "ja" ? "拒否する" : "Decline"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
