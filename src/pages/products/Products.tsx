import React from "react";
import { Link } from "react-router-dom";
import { Plug, Building2, Zap, BarChart3, Lock, TrendingUp, FileText, ShieldCheck } from "lucide-react";
import Header from "../../components/Header";
import { getAssetUrl } from "../../utils/assets";
import { useLanguage } from "../../LanguageContext";

const Products: React.FC = () => {
    const { lang } = useLanguage();

    // API 代理模块的特性列表
    const apiFeatures = [
        {
            icon: <Plug className="w-6 h-6 text-amber-600" />,
            titleJa: "REST API形式",
            titleEn: "REST API Format",
            descJa: "標準的なI/Fで即座に利用",
            descEn: "Use immediately with standard interface"
        },
        {
            icon: <Building2 className="w-6 h-6 text-amber-600" />,
            titleJa: "商用利用対応",
            titleEn: "Commercial Ready",
            descJa: "SLA保証のインフラ設計",
            descEn: "SLA-backed infrastructure"
        },
        {
            icon: <Zap className="w-6 h-6 text-amber-600" />,
            titleJa: "安定稼働",
            titleEn: "Stable Operation",
            descJa: "99.9%+ アップタイム",
            descEn: "99.9%+ uptime"
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-amber-600" />,
            titleJa: "使用量計測",
            titleEn: "Usage Tracking",
            descJa: "詳細な利用状況レポート",
            descEn: "Detailed usage reports"
        }
    ];

    // AI 网关模块的特性列表
    const gatewayFeatures = [
        {
            icon: <Lock className="w-6 h-6 text-purple-600" />,
            titleJa: "権限管理",
            titleEn: "Access Control",
            descJa: "きめ細かなアクセス制御",
            descEn: "Fine-grained access control"
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
            titleJa: "利用可視化",
            titleEn: "Usage Visibility",
            descJa: "リアルタイム使用量把握",
            descEn: "Real-time usage monitoring"
        },
        {
            icon: <FileText className="w-6 h-6 text-purple-600" />,
            titleJa: "ログ管理",
            titleEn: "Log Management",
            descJa: "監査対応可能な記録",
            descEn: "Audit-ready logging"
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
            titleJa: "ゼロトラスト",
            titleEn: "Zero Trust",
            descJa: "セキュリティ第一設計",
            descEn: "Security-first design"
        }
    ];

    // AI 支持服务的特性列表
    const supportFeatures = [
        {
            titleJa: "PoC・初期導入支援",
            titleEn: "PoC & Initial Setup",
            descJa: "実現可能性の検証からプロトタイプ構築",
            descEn: "Validation and prototype development"
        },
        {
            titleJa: "運用方針の整理",
            titleEn: "Operations Planning",
            descJa: "社内ガイドライン策定支援",
            descEn: "Internal guideline development"
        },
        {
            titleJa: "技術相談",
            titleEn: "Technical Consulting",
            descJa: "モデル選定・プロンプト設計アドバイス",
            descEn: "Model selection & prompt design advice"
        }
    ];

    return (
        <div className="min-h-screen font-sans text-slate-900">
            {/* ================= 顶部导航（固定，透明） ================= */}
            <Header position="fixed" variant="transparent" />

            {/* ================= 首屏：固定背景 ================= */}
            <section className="fixed inset-x-0 top-0 z-0 h-screen">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        src={getAssetUrl('product-top.png')}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-slate-900/80" />
                </div>


                {/* 内容容器 */}
                <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 md:px-6 lg:px-8 pt-12 pb-20 md:pt-14">
                    {/* 首屏文案 */}
                    <div className="fade-in-up">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-px w-8 bg-blue-400/80" />
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                                Products
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl mb-8 leading-tight">
                            {lang === "ja" ? (
                                <>生成AIを、<br />業務で使うための<br className="md:hidden" />プロダクト群</>
                            ) : (
                                <>Products for<br />Production-Ready<br className="md:hidden" /> Generative AI</>
                            )}
                        </h1>
                        <p className="max-w-2xl text-lg md:text-xl font-medium leading-relaxed text-slate-300">
                            {lang === "ja" ? (
                                <>
                                    Stratoflowは、
                                    <span className="text-white font-bold mx-2 border-b border-blue-500/50">API代理</span>
                                    <span className="text-slate-500 mx-1">/</span>
                                    <span className="text-white font-bold mx-2 border-b border-emerald-500/50">AI Gateway</span>
                                    <span className="text-slate-500 mx-1">/</span>
                                    <span className="text-white font-bold mx-2 border-b border-amber-500/50">AI支援</span>
                                    の3つのレイヤーから、
                                    企業や開発者の生成AI活用を段階的に支援します。
                                </>
                            ) : (
                                <>
                                    Stratoflow supports enterprise AI adoption through three layers:
                                    <span className="text-white font-bold mx-2 border-b border-blue-500/50">API Proxy</span>
                                    <span className="text-slate-500 mx-1">/</span>
                                    <span className="text-white font-bold mx-2 border-b border-emerald-500/50">AI Gateway</span>
                                    <span className="text-slate-500 mx-1">/</span>
                                    <span className="text-white font-bold mx-2 border-b border-amber-500/50">AI Support</span>
                                </>
                            )}
                        </p>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                        <span className="text-xs uppercase tracking-widest text-white/60">Scroll</span>
                        <div className="h-8 w-[1px] bg-white/40 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Spacer for Hero visibility */}
            <div className="h-[80vh]" />

            {/* ================= MAIN CONTENT (Slides over the hero) ================= */}
            <main
                className="relative z-10 min-h-screen bg-[#F2F2F2] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.2)]"
                style={{ borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}
            >
                <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pb-32 pt-20 md:pt-32">

                    {/* ================= OVERVIEW SECTION ================= */}
                    <section id="overview" className="mb-32">
                        <div className="relative pt-8 md:pt-12 mb-16">
                            <div className="pointer-events-none absolute -top-4 left-0 select-none md:-top-8">
                                <span className="text-[4rem] md:text-[7rem] font-bold leading-none text-[#E5E7EB] tracking-tight opacity-60">
                                    Overview
                                </span>
                            </div>
                            <h2 className="relative z-10 text-2xl font-bold text-slate-900 md:text-4xl">
                                {lang === "ja" ? "プロダクト構成" : "Product Overview"}
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {/* Card 1 */}
                            <div className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="text-6xl font-black text-blue-600">01</span>
                                </div>
                                <div className="inline-block px-3 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold mb-6 tracking-wide uppercase">
                                    Layer 1
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                                    {lang === "ja" ? "API代理" : "API Proxy"}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {lang === "ja"
                                        ? <>生成AI機能を、<br />すぐに使えるAPIとして提供</>
                                        : <>Generative AI capabilities<br />as ready-to-use APIs</>}
                                </p>
                            </div>
                            {/* Card 2 */}
                            <div className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="text-6xl font-black text-emerald-600">02</span>
                                </div>
                                <div className="inline-block px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold mb-6 tracking-wide uppercase">
                                    Layer 2
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900">AI Gateway</h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {lang === "ja"
                                        ? <>生成AIの利用を、<br />組織として安全に統合管理</>
                                        : <>Securely manage AI usage<br />across your organization</>}
                                </p>
                            </div>
                            {/* Card 3 */}
                            <div className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="text-6xl font-black text-purple-600">03</span>
                                </div>
                                <div className="inline-block px-3 py-1 rounded bg-purple-50 text-purple-700 text-xs font-bold mb-6 tracking-wide uppercase">
                                    Layer 3
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                                    {lang === "ja" ? "AI支援" : "AI Support"}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {lang === "ja"
                                        ? <>導入から運用までを、<br />実務視点でサポート</>
                                        : <>End-to-end support<br />from deployment to operations</>}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ================= DETAIL SECTION 1: API (Text Left, Image Right) ================= */}
                    <section id="api-proxy" className="mb-32">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                            {/* Left: Text Content */}
                            <div className="order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-50 text-amber-600 font-bold tracking-wide text-sm">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                    API Proxy
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                    <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                                        {lang === "ja" ? "生成AI機能を、" : "Generative AI,"}
                                    </span>
                                    <br />
                                    {lang === "ja" ? "シンプルなAPIで" : "via simple APIs"}
                                </h2>
                                <div className="space-y-4 text-slate-600 leading-relaxed text-base lg:text-lg mb-8">
                                    <p>
                                        {lang === "ja"
                                            ? "テキスト生成・画像生成・動画生成などの生成AI機能をAPIとして提供。既存システムへの組み込みが容易で、大規模なインフラ構築は不要です。"
                                            : "We provide generative AI capabilities including text, image, and video generation as APIs. Easy to integrate with existing systems, no large-scale infrastructure required."}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {apiFeatures.map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-white border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all">
                                            <span className="mb-2 block">{item.icon}</span>
                                            <h4 className="font-bold text-slate-900 text-sm">{lang === "ja" ? item.titleJa : item.titleEn}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{lang === "ja" ? item.descJa : item.descEn}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Image */}
                            <div className="order-1 lg:order-2 relative self-stretch flex items-center justify-center">
                                <div className="relative group w-full max-w-xl mx-auto">
                                    {/* Decorative Background */}
                                    <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-yellow-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                    {/* Screenshot Frame */}
                                    <div className="relative bg-white rounded-2xl p-2 shadow-lg ring-1 ring-slate-200">
                                        {/* Browser Chrome */}
                                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-t-xl border-b border-slate-100">
                                            <div className="flex gap-1.5">
                                                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                                            </div>
                                            <div className="flex-1 mx-4">
                                                <div className="bg-white rounded-md px-3 py-1.5 text-xs text-slate-500 text-center border border-slate-200">
                                                    api.stratoflow.io
                                                </div>
                                            </div>
                                        </div>

                                        {/* Screenshot Image */}
                                        <img
                                            src={getAssetUrl("product-1.jpg")}
                                            alt="API Proxy Interface"
                                            className="w-full rounded-b-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================= DETAIL SECTION 2: GATEWAY (Image Left, Text Right) ================= */}
                    <section id="ai-gateway" className="mb-32">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                            {/* Left: Screenshot */}
                            <div className="relative self-stretch flex items-center justify-center">
                                <div className="relative group w-full max-w-xl mx-auto">
                                    {/* Decorative Background */}
                                    <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-indigo-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                    {/* Screenshot Frame */}
                                    <div className="relative bg-white rounded-2xl p-2 shadow-lg ring-1 ring-slate-200">
                                        {/* Browser Chrome */}
                                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-t-xl border-b border-slate-100">
                                            <div className="flex gap-1.5">
                                                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                                            </div>
                                            <div className="flex-1 mx-4">
                                                <div className="bg-white rounded-md px-3 py-1.5 text-xs text-slate-500 text-center border border-slate-200">
                                                    gateway.stratoflow.io/admin
                                                </div>
                                            </div>
                                        </div>

                                        {/* Screenshot Image */}
                                        <img
                                            src={getAssetUrl("product-support-mockup.jpg")}
                                            alt="AI Gateway Administration"
                                            className="w-full rounded-b-xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Text Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-purple-50 text-purple-600 font-bold tracking-wide text-sm">
                                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                                    AI Gateway
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                    <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400 bg-clip-text text-transparent">
                                        {lang === "ja" ? "組織として管理" : "Centralized control"}
                                    </span>
                                    {lang === "ja" ? "する" : ""}
                                    <br />
                                    {lang === "ja" ? "共通入口" : "for your organization"}
                                </h2>
                                <div className="space-y-4 text-slate-600 leading-relaxed text-base lg:text-lg mb-8">
                                    <p>
                                        {lang === "ja"
                                            ? "生成AIへのアクセスを共通のゲートウェイとして管理。APIキー管理、権限制御、利用状況の可視化を一元的に行い、セキュリティとガバナンスを両立します。"
                                            : "Manage access to generative AI through a unified gateway. Centralize API key management, access control, and usage visibility while maintaining security and governance."}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {gatewayFeatures.map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-white border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all">
                                            <span className="mb-2 block">{item.icon}</span>
                                            <h4 className="font-bold text-slate-900 text-sm">{lang === "ja" ? item.titleJa : item.titleEn}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{lang === "ja" ? item.descJa : item.descEn}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================= DETAIL SECTION 3: SUPPORT (Text Left, Image Right) ================= */}
                    <section id="ai-support" className="mb-20">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                            {/* Left: Text Content */}
                            <div className="order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-bold tracking-wide text-sm">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    AI Support
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                    {lang === "ja" ? "導入から運用まで" : "From deployment"}
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-400 bg-clip-text text-transparent">
                                        {lang === "ja" ? "段階的にサポート" : "to operations support"}
                                    </span>
                                </h2>
                                <div className="space-y-4 text-slate-600 leading-relaxed text-base lg:text-lg mb-8">
                                    <p>
                                        {lang === "ja"
                                            ? "技術面だけでなく運用設計や利用ルールの整理が重要。PoCから初期導入、運用設計まで企業の状況に応じて支援します。"
                                            : "Beyond technical aspects, operational design and usage guidelines are crucial. We support from PoC to initial deployment and operations planning based on your needs."}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    {supportFeatures.map((item, idx) => (
                                        <div key={idx} className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
                                            <div className="shrink-0 mt-1 w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 group-hover:scale-110 transition-transform" />
                                            <div>
                                                <h4 className="font-bold text-slate-900">{lang === "ja" ? item.titleJa : item.titleEn}</h4>
                                                <p className="text-sm text-slate-500 mt-0.5">{lang === "ja" ? item.descJa : item.descEn}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Screenshot */}
                            <div className="order-1 lg:order-2 relative self-stretch flex items-center justify-center">
                                <div className="relative group w-full max-w-xl mx-auto">
                                    {/* Decorative Background */}
                                    <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-green-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                    {/* Screenshot Frame */}
                                    <div className="relative bg-white rounded-2xl p-2 shadow-lg ring-1 ring-slate-200">
                                        {/* Browser Chrome */}
                                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-t-xl border-b border-slate-100">
                                            <div className="flex gap-1.5">
                                                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                                            </div>
                                            <div className="flex-1 mx-4">
                                                <div className="bg-white rounded-md px-3 py-1.5 text-xs text-slate-500 text-center border border-slate-200">
                                                    support.stratoflow.io/analytics
                                                </div>
                                            </div>
                                        </div>

                                        {/* Screenshot Image */}
                                        <img
                                            src={getAssetUrl("product-gateway-mockup.png")}
                                            alt="AI Support Analytics"
                                            className="w-full rounded-b-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================= ARCHITECTURE ================= */}
                    <section id="architecture" className="mb-20">
                        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-10 md:p-16">
                            {/* Subtle gradient accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />

                            {/* Decorative grid dots */}
                            <div className="absolute top-8 right-8 grid grid-cols-4 gap-2 opacity-20">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                ))}
                            </div>

                            <div className="relative z-10 max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium uppercase tracking-wider mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    Architecture
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                                    {lang === "ja" ? "アーキテクチャと今後の方向性" : "Architecture and Future Direction"}
                                </h2>
                                <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
                                    <p>
                                        {lang === "ja"
                                            ? "Stratoflowのプロダクトは、将来的に複数のモデルや推論基盤を柔軟に扱える構成を想定して設計されています。"
                                            : "Stratoflow's products are designed with a flexible architecture that can handle multiple models and inference backends in the future."}
                                    </p>
                                    <p>
                                        {lang === "ja"
                                            ? "現在はAPI提供と利用管理を中心にサービスを展開しながら、段階的にAIインフラレイヤーへと発展させていく方針です。"
                                            : "We are currently focused on API provision and usage management, with plans to gradually expand into AI infrastructure layers."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================= CTA ================= */}
                    <section className="text-center max-w-2xl mx-auto pb-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
                            {lang === "ja" ? "お問い合わせ" : "Contact Us"}
                        </h2>
                        <p className="text-slate-500 mb-8 text-base">
                            {lang === "ja"
                                ? "生成AIの導入や活用について、ユースケースやご状況に応じてご相談いただけます。"
                                : "Discuss your generative AI adoption based on your use case and situation."}
                        </p>
                        <Link
                            to="/contact-sales"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all hover:-translate-y-0.5"
                        >
                            {lang === "ja" ? "お問い合わせ" : "Contact Us"}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </Link>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Products;
