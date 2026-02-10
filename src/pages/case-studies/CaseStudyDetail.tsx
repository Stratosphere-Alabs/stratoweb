import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "@/LanguageContext";

import { CASE_STUDIES } from "@/data/caseStudies";

const CaseStudyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { lang } = useLanguage();

    const study = id ? CASE_STUDIES.find(s => s.id === id) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!study) {
        return (
            <div className="min-h-screen bg-white">
                <Header position="fixed" variant="transparent" />
                <div className="flex items-center justify-center pt-32 pb-16">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900">
                            {lang === "ja" ? "ページが見つかりません" : "Page Not Found"}
                        </h1>
                        <Link to="/case-studies" className="mt-4 inline-block text-sky-600 hover:underline">
                            {lang === "ja" ? "← 導入事例一覧へ戻る" : "← Back to Case Studies"}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const title = lang === "ja" ? study.titleJa : study.titleEn;
    const results = lang === "ja" ? study.resultsJa : study.resultsEn;
    const profile = study.companyProfile;
    const sections = study.sections;

    const renderText = (text: string) => {
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            <Header position="fixed" variant="transparent" />

            {/* Hero Image */}
            <div className="relative h-[60vh] min-h-[450px]">
                <img
                    src={study.imageUrl}
                    alt={title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
                        <div className="mb-4 flex flex-wrap gap-2">
                            {study.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
                            {title}
                        </h1>
                        <p className="mt-4 text-sm font-bold text-[#00a3ff] tracking-wider">{study.date}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="mx-auto max-w-[1000px] px-4 py-12 md:px-6 md:py-16 lg:px-8">
                {/* Back Link */}
                <Link
                    to="/case-studies"
                    className="mb-10 inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {lang === "ja" ? "導入事例一覧へ戻る" : "Back to Case Studies"}
                </Link>

                {/* Company Profile Box */}
                <div className="mb-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                    <h2 className="mb-6 text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                        {lang === "ja" ? "■ 企業概要" : "Company Profile"}
                    </h2>
                    <dl className="grid gap-y-4 gap-x-8 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{lang === "ja" ? "会社名" : "Name"}</dt>
                            <dd className="text-base font-medium text-slate-900">{lang === "ja" ? profile.nameJa : profile.nameEn}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{lang === "ja" ? "業界" : "Industry"}</dt>
                            <dd className="text-base font-medium text-slate-900">{lang === "ja" ? profile.industryJa : profile.industryEn}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{lang === "ja" ? "従業員数" : "Employees"}</dt>
                            <dd className="text-base font-medium text-slate-900">{profile.employees}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{lang === "ja" ? "業務内容" : "Business"}</dt>
                            <dd className="text-base font-medium text-slate-900">{lang === "ja" ? profile.businessJa : profile.businessEn}</dd>
                        </div>
                    </dl>
                </div>

                {/* Main Content Sections */}
                <div className="space-y-16">
                    {/* Challenges */}
                    <section>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-start">
                            <span className="mr-3 text-blue-600">■</span>
                            {lang === "ja" ? (sections.challenges.titleJa.split('：')[0] + (sections.challenges.titleJa.includes('：') ? '' : '')) : "Challenges"}
                        </h3>
                        {/* Subtitle from the data if available */}
                        {lang === "ja" && sections.challenges.titleJa.includes('：') && (
                            <h4 className="text-lg font-semibold text-slate-800 mb-4 pl-7">
                                {sections.challenges.titleJa.split('：')[1]}
                            </h4>
                        )}
                        <div className="prose prose-slate max-w-none pl-0 md:pl-7 leading-loose text-slate-700">
                            <p>{renderText(lang === "ja" ? sections.challenges.contentJa : sections.challenges.contentEn)}</p>
                        </div>
                    </section>

                    {/* Solution */}
                    <section>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-start">
                            <span className="mr-3 text-blue-600">■</span>
                            {lang === "ja" ? (sections.solution.titleJa.split('：')[0] + (sections.solution.titleJa.includes('：') ? '' : '')) : "Solution"}
                        </h3>
                        {lang === "ja" && sections.solution.titleJa.includes('：') && (
                            <h4 className="text-lg font-semibold text-slate-800 mb-4 pl-7">
                                {sections.solution.titleJa.split('：')[1]}
                            </h4>
                        )}
                        <div className="prose prose-slate max-w-none pl-0 md:pl-7 leading-loose text-slate-700">
                            <p>{renderText(lang === "ja" ? sections.solution.contentJa : sections.solution.contentEn)}</p>
                        </div>
                    </section>

                    {/* Effects */}
                    <section>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-start">
                            <span className="mr-3 text-blue-600">■</span>
                            {lang === "ja" ? (sections.effects.titleJa.split('：')[0] + (sections.effects.titleJa.includes('：') ? '' : '')) : "Effects"}
                        </h3>
                        {lang === "ja" && sections.effects.titleJa.includes('：') && (
                            <h4 className="text-lg font-semibold text-slate-800 mb-4 pl-7">
                                {sections.effects.titleJa.split('：')[1]}
                            </h4>
                        )}
                        <div className="prose prose-slate max-w-none pl-0 md:pl-7 leading-loose text-slate-700">
                            <p>{renderText(lang === "ja" ? sections.effects.contentJa : sections.effects.contentEn)}</p>
                        </div>
                    </section>
                </div>

                {/* Results Section */}
                <div className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white">
                    <h2 className="mb-8 text-xl font-bold border-b border-white/20 pb-4 inline-block">
                        {lang === "ja" ? "■ 導入効果" : "Results"}
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {results.map((result, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-[#00a3ff] mb-2">{result.value}</div>
                                <div className="text-sm md:text-base text-slate-300 font-medium">{result.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-200/50">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {lang === "ja"
                            ? "貴社のユースケースについてご相談ください"
                            : "Let's discuss your use case"}
                    </h3>
                    <p className="mx-auto max-w-lg text-slate-600 mb-8 leading-relaxed">
                        {lang === "ja"
                            ? "Stratoflow がどのように貴社のビジネスを支援できるか、まずはお気軽にご相談ください。専任のコンサルタントが最適なプランをご提案します。"
                            : "Contact us to learn how Stratoflow can help transform your business. Our consultants will propose the best plan for you."}
                    </p>
                    <Link
                        to="/contact-sales"
                        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:translate-y-[-1px]"
                    >
                        {lang === "ja" ? "お問い合わせはこちら" : "Contact Sales"}
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default CaseStudyDetail;
