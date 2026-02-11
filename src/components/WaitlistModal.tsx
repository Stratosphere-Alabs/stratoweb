import React, { useState, useEffect } from "react";
import { useLanguage } from "@/LanguageContext";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";
import { getAssetUrl } from "@/utils/assets";
import { api } from "@/lib/api";

const WaitlistModal: React.FC = () => {
    const { lang } = useLanguage();
    const { isOpen, closeModal } = useWaitlistModal();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        company: "",
        useCase: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string>("");

    // 弹窗打开时禁止页面滚动
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // 弹窗关闭时重置表单
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsSubmitted(false);
                setError("");
                setFormData({ email: "", name: "", company: "", useCase: "" });
            }, 300);
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            await api.joinWaitlist({
                email: formData.email,
                name: formData.name || undefined,
                event: "signup",
                meta: {
                    company: formData.company || null,
                    useCase: formData.useCase || null,
                    source: "modal",
                },
            });

            setIsSubmitted(true);
            console.log("Waitlist form submitted successfully");
        } catch (err) {
            console.error("Waitlist submission error:", err);
            setError(err instanceof Error ? err.message : "Failed to join waitlist");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            {/* 背景遮罩 */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* 弹窗容器 */}
            <div
                className="relative w-[95vw] max-w-[1600px] max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex animate-modal-enter"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 左侧品牌区 */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
                    {/* 背景图：3D 抽象 */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-70"
                        style={{
                            backgroundImage: `url('${getAssetUrl("loginpage.png")}')`,
                        }}
                    />
                    {/* 渐变覆盖层 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-transparent" />

                    {/* 文案内容 */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-between p-8">
                        {/* 左上角 Logo */}
                        <div>
                            <img src={getAssetUrl("logo2.png")} alt="Stratoflow" className="h-7 w-auto" />
                        </div>

                        {/* 中部标语（左对齐） */}
                        <div className="flex-1 flex items-center justify-center w-full">
                            <div className="max-w-xl space-y-4 text-left">
                                <h2 className="text-2xl font-bold text-white leading-tight">
                                    {lang === "ja"
                                        ? "インフラの悩みゼロで、AIを大規模展開。"
                                        : "Scale AI without infrastructure headaches."}
                                </h2>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    {lang === "ja"
                                        ? "エンタープライズ向け GPU コンピューティングと推論 API を、オンデマンドで。"
                                        : "Enterprise-grade GPU computing and inference APIs, on demand."}
                                </p>
                            </div>
                        </div>

                        {/* Footer - Left aligned */}
                        <div className="text-xs text-white/40">
                            © 2025 Stratoflow Inc.
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 p-8 md:p-12 lg:p-24 overflow-y-auto max-h-[90vh]">
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {!isSubmitted ? (
                        <>
                            {/* Header */}
                            <div className="mb-8">
                                {/* Beta Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                    {lang === "ja" ? "ベータ版準備中" : "Beta Coming Soon"}
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 tracking-tight md:text-2xl">
                                    {lang === "ja" ? "ウェイティングリストに登録" : "Join the Waiting List"}
                                </h2>
                                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                    {lang === "ja"
                                        ? "正式リリース時に、登録順で優先的にご招待メールをお送りします。"
                                        : "When we launch, we'll send invitation emails in the order you signed up."}
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email */}
                                <div>
                                    <label htmlFor="wl-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {lang === "ja" ? "メールアドレス" : "Email Address"} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="wl-email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={lang === "ja" ? "you@company.com" : "you@company.com"}
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                {/* Name */}
                                <div>
                                    <label htmlFor="wl-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {lang === "ja" ? "お名前" : "Full Name"} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="wl-name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={lang === "ja" ? "山田 太郎" : "John Doe"}
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label htmlFor="wl-company" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {lang === "ja" ? "会社名" : "Company"}
                                    </label>
                                    <input
                                        type="text"
                                        id="wl-company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder={lang === "ja" ? "株式会社〇〇" : "Acme Inc."}
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                <div className="mt-8">
                                    {error && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 px-6 rounded-xl bg-black text-white font-semibold text-sm transition-all hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                {lang === "ja" ? "送信中..." : "Submitting..."}
                                            </>
                                        ) : (
                                            lang === "ja" ? "ウェイティングリストに登録" : "Join Waiting List"
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Divider */}
                            <div className="my-8 flex items-center gap-4">
                                <div className="flex-1 h-px bg-slate-200" />
                                <span className="text-xs text-slate-400">{lang === "ja" ? "または" : "or"}</span>
                                <div className="flex-1 h-px bg-slate-200" />
                            </div>

                            {/* Disabled Social Login Buttons */}
                            <div className="space-y-3">
                                <p className="text-xs text-slate-400 text-center mb-3">
                                    {lang === "ja" ? "正式版リリース後に利用可能になります" : "Available after official launch"}
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        disabled
                                        className="flex items-center justify-center py-3 px-4 rounded-xl border border-slate-200 bg-transparent opacity-40 cursor-not-allowed grayscale"
                                        title={lang === "ja" ? "正式版リリース後に利用可能" : "Available after launch"}
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </button>
                                    <button
                                        disabled
                                        className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed grayscale"
                                        title={lang === "ja" ? "正式版リリース後に利用可能" : "Available after launch"}
                                    >
                                        <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </button>
                                    <button
                                        disabled
                                        className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed grayscale"
                                        title={lang === "ja" ? "正式版リリース後に利用可能" : "Available after launch"}
                                    >
                                        <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 text-center">
                                <p className="text-xs text-slate-400">
                                    {lang === "ja"
                                        ? "登録することで、利用規約とプライバシーポリシーに同意したものとみなします。"
                                        : "By signing up, you agree to our Terms of Service and Privacy Policy."}
                                </p>
                            </div>
                        </>
                    ) : (
                        /* Success State */
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                {lang === "ja" ? "登録完了！" : "You're on the list!"}
                            </h2>
                            <p className="text-slate-500 mb-2 max-w-sm">
                                {lang === "ja"
                                    ? "ウェイティングリストへのご登録ありがとうございます。"
                                    : "Thank you for joining our waiting list."}
                            </p>
                            <p className="text-sm text-slate-400 mb-8 max-w-sm">
                                {lang === "ja"
                                    ? "正式リリース時に、登録順で招待メールをお送りします。楽しみにお待ちください！"
                                    : "We'll send you an invitation email in the order you signed up when we launch. Stay tuned!"}
                            </p>
                            <button
                                onClick={closeModal}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors"
                            >
                                {lang === "ja" ? "閉じる" : "Close"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WaitlistModal;
