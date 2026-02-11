import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { getAssetUrl } from "@/utils/assets";

const Footer: React.FC = () => {
    const { lang } = useLanguage();

    return (
        <footer className="relative z-10 bg-[#F2F2F2] pt-24 pb-10 text-xs md:text-sm text-slate-600 border-t border-slate-200">
            <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    {/* Logo Section - Left */}
                    <div className="flex items-center">
                        <Link to="/" aria-label="Go to home">
                            <img
                                src={getAssetUrl("stratoflow-logo.png")}
                                alt="Stratoflow logo"
                                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"

                            />
                        </Link>
                    </div>

                    {/* Navigation Links - Right */}
                    <div className="flex flex-1 flex-wrap gap-12 md:justify-end">
                        {/* Products */}
                        <div className="space-y-5">
                            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wide text-slate-900">
                                {lang === "ja" ? "プロダクト" : "Products"}
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        to="/models"
                                        className="text-xs md:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        {lang === "ja" ? "AIモデル" : "AI Models"}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/products"
                                        className="text-xs md:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        Platform
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/products/private-cloud"
                                        className="text-xs md:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        Private Cloud
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-5">
                            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wide text-slate-900">
                                {lang === "ja" ? "ソリューション" : "Solutions"}
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        to="/case-studies"
                                        className="text-xs md:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        {lang === "ja" ? "導入事例" : "Case Studies"}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact-sales"
                                        className="text-xs md:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        {lang === "ja" ? "お問い合わせ" : "Contact Sales"}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="space-y-5">
                            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wide text-slate-900">
                                {lang === "ja" ? "会社情報" : "Company"}
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        to="/company/about"
                                        className="text-xs md:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        {lang === "ja" ? "会社概要" : "About Us"}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Copyright */}
                        <span className="text-xs text-slate-500">
                            © {new Date().getFullYear()} Stratoflow Inc. All rights reserved.
                        </span>

                        {/* Legal Links */}
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                            <Link
                                to="/legal/privacy"
                                className="text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                {lang === "ja" ? "プライバシーポリシー" : "Privacy Policy"}
                            </Link>
                            <span className="text-slate-400">·</span>
                            <Link
                                to="/legal/terms"
                                className="text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                {lang === "ja" ? "利用規約" : "Terms of Use"}
                            </Link>
                            <span className="text-slate-400">·</span>
                            <Link
                                to="/legal/specified-commercial-transaction"
                                className="text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                {lang === "ja" ? "特定商取引法" : "Legal Notice"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
