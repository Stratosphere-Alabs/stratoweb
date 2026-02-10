import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "@/LanguageContext";

import { CASE_STUDIES } from "@/data/caseStudies";

const CaseStudies: React.FC = () => {
    const { lang } = useLanguage();

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-800">
            <Header position="fixed" variant="transparent" />

            {/* Hero Section with Image Background (like Home page) */}
            <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')",
                    }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

                <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                        {lang === "ja" ? "導入事例" : "Case Studies"}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-white/80">
                        {lang === "ja"
                            ? "Stratoflow を活用した企業の成功事例をご紹介します。"
                            : "Discover how leading companies achieve success with Stratoflow."}
                    </p>
                </div>
            </section>

            {/* Notice Banner */}
            <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pt-8">
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800">
                    <p className="text-sm md:text-base">
                        {lang === "ja"
                            ? "※現在、実際の導入事例を準備中です。本ページは構成例として掲載しています。"
                            : "※Actual case studies are currently being prepared. This page is displayed as a configuration example."}
                    </p>
                </div>
            </div>

            {/* Case Studies Grid */}
            <main className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-16 md:py-20">
                <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                    {CASE_STUDIES.map((study) => (
                        <Link
                            key={study.id}
                            to={`/case-studies/${study.id}`}
                            className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
                        >
                            {/* Image */}
                            <div className="aspect-[16/9] overflow-hidden">
                                <img
                                    src={study.imageUrl}
                                    alt={lang === "ja" ? study.titleJa : study.titleEn}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                {/* Tags */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {study.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h2 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-slate-700 md:text-xl">
                                    {lang === "ja" ? study.titleJa : study.titleEn}
                                </h2>

                                {/* Summary */}
                                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                    {lang === "ja" ? study.summaryJa : study.summaryEn}
                                </p>

                                {/* Date & Arrow */}
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#00a3ff] tracking-wider">{study.date}</span>
                                    <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 transition-colors group-hover:text-sky-600">
                                        {lang === "ja" ? "詳細を見る" : "Read more"}
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 rounded-2xl bg-slate-100 px-8 py-12 text-center">
                    <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                        {lang === "ja"
                            ? "貴社のユースケースをお聞かせください"
                            : "Tell us about your use case"}
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-slate-600">
                        {lang === "ja"
                            ? "Stratoflow がどのように貴社のビジネスを支援できるか、まずはお気軽にご相談ください。"
                            : "Let's discuss how Stratoflow can help transform your business."}
                    </p>
                    <Link
                        to="/contact-sales"
                        className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                    >
                        {lang === "ja" ? "お問い合わせ" : "Contact Sales"}
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default CaseStudies;
