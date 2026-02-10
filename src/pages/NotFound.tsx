import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const NotFound: React.FC = () => {
    const { lang } = useLanguage();

    return (
        <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <h1 className="text-[120px] md:text-[180px] font-bold text-slate-900 leading-none opacity-20">
                        404
                    </h1>
                </div>

                {/* Message */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        {lang === "ja" ? "ページが見つかりません" : "Page Not Found"}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-md mx-auto">
                        {lang === "ja"
                            ? "お探しのページは移動または削除された可能性があります。"
                            : "The page you're looking for might have been moved or deleted."}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20"
                    >
                        {lang === "ja" ? "ホームに戻る" : "Back to Home"}
                    </Link>

                    <Link
                        to="/models"
                        className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl border border-slate-200 transition-all hover:-translate-y-0.5"
                    >
                        {lang === "ja" ? "モデルを見る" : "Browse Models"}
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-16 pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-500 mb-4">
                        {lang === "ja" ? "よく使われるページ：" : "Popular pages:"}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <Link to="/docs/getting-started" className="text-blue-600 hover:underline">
                            {lang === "ja" ? "クイックスタート" : "Getting Started"}
                        </Link>
                        <Link to="/docs/api-reference" className="text-blue-600 hover:underline">
                            API Reference
                        </Link>
                        <Link to="/contact-sales" className="text-blue-600 hover:underline">
                            {lang === "ja" ? "お問い合わせ" : "Contact Sales"}
                        </Link>
                        <Link to="/company/about" className="text-blue-600 hover:underline">
                            {lang === "ja" ? "会社概要" : "About Us"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
