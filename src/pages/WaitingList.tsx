import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/LanguageContext";

const WaitingList: React.FC = () => {
    const { lang } = useLanguage();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        company: "",
        useCase: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call - replace with actual backend integration
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log("Form submitted:", formData);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Branding & Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')",
                    }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-10 lg:p-12">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <svg className="h-8 w-8 text-white" viewBox="0 0 32 32" fill="currentColor">
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="16" cy="16" r="6" fill="currentColor" />
                        </svg>
                        <span className="text-xl font-bold text-white tracking-tight">Stratoflow</span>
                    </Link>

                    {/* Tagline */}
                    <div className="max-w-md space-y-4">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                            {lang === "ja"
                                ? "インフラの悩みゼロで、AIを大規模展開。"
                                : "Scale AI without infrastructure headaches."}
                        </h1>
                        <p className="text-base text-white/70 leading-relaxed">
                            {lang === "ja"
                                ? "エンタープライズ向け GPU コンピューティングと推論 API を、オンデマンドで。"
                                : "Enterprise-grade GPU computing and inference APIs, on demand."}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="text-xs text-white/40">
                        © 2025 Stratoflow Inc.
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8">
                        <Link to="/" className="flex items-center gap-2">
                            <svg className="h-7 w-7 text-slate-900" viewBox="0 0 32 32" fill="currentColor">
                                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
                                <circle cx="16" cy="16" r="6" fill="currentColor" />
                            </svg>
                            <span className="text-lg font-bold text-slate-900 tracking-tight">Stratoflow</span>
                        </Link>
                    </div>

                    {!isSubmitted ? (
                        <>
                            {/* Header */}
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                    {lang === "ja" ? "ベータ版準備中" : "Beta Coming Soon"}
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                                    {lang === "ja" ? "ウェイティングリストに登録" : "Join the Waiting List"}
                                </h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    {lang === "ja"
                                        ? "ベータ版の準備ができ次第、優先的にご案内いたします。"
                                        : "Be the first to know when we launch. Get priority access to our beta."}
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {lang === "ja" ? "メールアドレス" : "Email Address"} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={lang === "ja" ? "you@company.com" : "you@company.com"}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {lang === "ja" ? "お名前" : "Full Name"} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={lang === "ja" ? "山田 太郎" : "John Doe"}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {lang === "ja" ? "会社名" : "Company"}
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder={lang === "ja" ? "株式会社〇〇" : "Acme Inc."}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                {/* Use Case */}
                                <div>
                                    <label htmlFor="useCase" className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {lang === "ja" ? "想定しているユースケース" : "Intended Use Case"}
                                    </label>
                                    <select
                                        id="useCase"
                                        name="useCase"
                                        value={formData.useCase}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                                    >
                                        <option value="">{lang === "ja" ? "選択してください" : "Select one..."}</option>
                                        <option value="chatbot">{lang === "ja" ? "チャットボット / カスタマーサポート" : "Chatbot / Customer Support"}</option>
                                        <option value="content">{lang === "ja" ? "コンテンツ生成" : "Content Generation"}</option>
                                        <option value="analysis">{lang === "ja" ? "データ分析 / インサイト" : "Data Analysis / Insights"}</option>
                                        <option value="image">{lang === "ja" ? "画像認識 / 生成" : "Image Recognition / Generation"}</option>
                                        <option value="internal">{lang === "ja" ? "社内ツール / 業務効率化" : "Internal Tools / Automation"}</option>
                                        <option value="other">{lang === "ja" ? "その他" : "Other"}</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 px-6 rounded-xl bg-slate-900 text-white font-semibold text-sm transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                                        lang === "ja" ? "登録する" : "Join Waiting List"
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-8 flex items-center gap-4">
                                <div className="flex-1 h-px bg-slate-200" />
                                <span className="text-xs text-slate-400">{lang === "ja" ? "または" : "or"}</span>
                                <div className="flex-1 h-px bg-slate-200" />
                            </div>

                            {/* Social Login Placeholders (for future use) */}
                            <div className="grid grid-cols-3 gap-3">
                                <button className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </button>
                                <button className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </button>
                                <button className="flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                                    <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Footer Links */}
                            <div className="mt-8 text-center space-y-2">
                                <p className="text-sm text-slate-500">
                                    {lang === "ja" ? "すでにアカウントをお持ちですか？ " : "Already have an account? "}
                                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                        {lang === "ja" ? "ログイン" : "Sign in"}
                                    </Link>
                                </p>
                                <p className="text-xs text-slate-400">
                                    <Link to="/privacy" className="hover:text-slate-600">{lang === "ja" ? "プライバシーポリシー" : "Privacy Policy"}</Link>
                                    <span className="mx-2">·</span>
                                    <Link to="/terms" className="hover:text-slate-600">{lang === "ja" ? "利用規約" : "Terms of Service"}</Link>
                                </p>
                            </div>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                {lang === "ja" ? "登録完了！" : "You're on the list!"}
                            </h2>
                            <p className="text-slate-500 mb-8">
                                {lang === "ja"
                                    ? "ベータ版の準備ができ次第、ご登録いただいたメールアドレスにご連絡いたします。"
                                    : "We'll notify you at the email address you provided when beta access is available."}
                            </p>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {lang === "ja" ? "ホームに戻る" : "Back to Home"}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WaitingList;
