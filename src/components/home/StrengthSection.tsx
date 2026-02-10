import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import StrengthLinesBackground from "../StrengthLinesBackground";
import { getAssetUrl } from "@/utils/assets";


const StrengthSection: React.FC = () => {
    const { lang } = useLanguage();
    const [strengthIndex, setStrengthIndex] = useState<0 | 1>(0);

    // 每 10 秒自动切换一次内容
    useEffect(() => {
        const interval = setInterval(() => {
            setStrengthIndex((prev) => (prev === 0 ? 1 : 0));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // 触控滑动处理
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setStrengthIndex(1); // 左滑：切到下一页（这里固定为 1）
        } else if (isRightSwipe) {
            setStrengthIndex(0); // 右滑：切回上一页（这里固定为 0）
        }
    };

    const strengthContent = [
        {
            tagJa: "安定したAI体験を支えるプロダクション向けAPI設計",
            tagEn: "Production-ready API design for stable AI experiences",
            bodyJa:
                "StratoflowのAPIは、安定した応答性能と可用性を重視して設計されています。トラフィックの増減や利用状況を監視しながら、プロダクション環境でも安心して利用できるAPI運用を行っています。今後は、推論制御や基盤抽象といった領域にも段階的に取り組んでいく予定です。",
            bodyEn:
                "Stratoflow's API is designed with a focus on stable response performance and availability. We monitor traffic fluctuations and usage patterns to ensure reliable API operations even in production environments. Going forward, we plan to gradually expand into areas such as inference control and infrastructure abstraction.",
            highlightJa:
                "チャットボットからレコメンド、社内検索まで、どのユースケースでもレスポンスのブレを抑え、「待たせない」AI 体験を少人数のチームでも運用できるようにします。",
            highlightEn:
                "From chatbots to recommendations and internal search, Stratoflow reduces response-time variability so even small teams can run “no-wait” AI experiences in production.",
        },
        {
            tagJa: "安全なAIゲートウェイで、生成AIをまとめて管理",
            tagEn: "A secure AI gateway to manage all your generative AI in one place",
            bodyJa:
                "StratoflowのAIゲートウェイは、クラウドやベンダーの違いをまたいで、生成AIモデルを共通の入口から利用できるように設計されています。APIキー管理、アクセス権限、レート制御、利用ログの保存を共通レイヤーで管理できるため、「誰が・どのモデルを・どれくらい使っているか」をひと目で把握できます。",
            bodyEn:
                "Stratoflow's AI Gateway is designed to let you access generative AI models from a common entry point, regardless of cloud or vendor differences. By managing API keys, access permissions, rate controls, and usage logs in a common layer, you can see at a glance who is using which models and how much.",
            highlightJa:
                "ゼロトラストを前提とした認証・権限制御と、詳細な利用ログ管理により、セキュリティ要件の厳しい環境でも生成AIを安全に導入・運用できます。",
            highlightEn:
                "With zero-trust authentication and permission control, along with detailed usage log management, you can safely deploy and operate generative AI even in environments with strict security requirements.",
        },
    ] as const;

    const activeStrength = strengthContent[strengthIndex];

    return (
        <section className="bg-[#F0F0F0]">
            <div
                className="relative"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* 粘性动画的 CSS */}
                <style>{`
                    @keyframes sticky-in {
                        0% { opacity: 0; transform: translateY(10px) scale(0.98); }
                        100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .animate-sticky-in {
                        animation: sticky-in 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                    }
                `}</style>
                <StrengthLinesBackground animated delay={200} />
                {/* 标准布局：居中容器 + 最大宽度 */}
                <div className="relative w-full py-30 md:py-36 px-6 md:px-8 lg:px-12">
                    <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
                        {/* 左侧文案 */}
                        <div className="flex items-center">
                            <div className="w-full space-y-10">
                                <div className={`relative ${lang === "ja" ? "min-h-[4rem] md:min-h-[6rem]" : "min-h-[8rem] md:min-h-[11rem]"}`}>
                                    <h2
                                        key={strengthIndex}
                                        className="animate-sticky-in text-[2rem] font-bold leading-tight tracking-tight text-slate-900 md:text-[2.3rem] absolute top-0 left-0 w-full"
                                    >
                                        {strengthIndex === 0 ? (
                                            <>
                                                <span>
                                                    {lang === "ja"
                                                        ? "安定したAI体験を支える"
                                                        : "Stable AI experiences backed by"}
                                                </span>
                                                <br />
                                                <span>
                                                    {lang === "ja"
                                                        ? "プロダクション向けAPI設計"
                                                        : "production-ready API design"}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="block">
                                                    {lang === "ja"
                                                        ? "複数の生成AIを、安全に統合管理するAIゲートウェイ"
                                                        : "Securely manage multiple"}
                                                </span>
                                                <span className="block mt-2 md:mt-3">
                                                    {lang === "ja"
                                                        ? ""
                                                        : "generative AIs with AI Gateway"}
                                                </span>
                                            </>
                                        )}
                                    </h2>
                                </div>

                                <div className="space-y-5" key={`content-${strengthIndex}`}>
                                    <div className="animate-sticky-in" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
                                            {lang === "ja" ? activeStrength.tagJa : activeStrength.tagEn}
                                        </p>
                                        <div className="mt-2 h-px w-full bg-gradient-to-r from-[#1D4ED8] via-[#FF8C00] to-[#1D4ED8]" />
                                    </div>
                                    <div className="min-h-[6rem]">
                                        <p className="block w-full text-sm leading-relaxed text-slate-700 md:text-[0.95rem] animate-sticky-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                                            {lang === "ja" ? activeStrength.bodyJa : activeStrength.bodyEn}
                                        </p>
                                    </div>
                                </div>

                                {/* 指示器切换按钮 */}
                                <div className="flex items-center justify-center gap-3 pt-2">
                                    {[0, 1].map((i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setStrengthIndex(i as 0 | 1)}
                                            className="focus:outline-none p-2 -m-2"
                                            aria-label={i === 0 ? "Strength 1" : "Strength 2"}
                                        >
                                            <div
                                                className={[
                                                    "h-1 rounded-full transition-all duration-300",
                                                    strengthIndex === i
                                                        ? "w-12 bg-[#2563EB]"
                                                        : "w-4 bg-gray-300",
                                                ].join(" ")}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <div
                                    key={strengthIndex}
                                    className="mt-6 border-l-4 border-[#1D4ED8] bg-white/70 px-4 py-4 text-sm leading-relaxed text-slate-800 md:px-5 md:py-6 overflow-hidden animate-sticky-in"
                                    style={{ animationDelay: '150ms', animationFillMode: 'both' }}
                                >
                                    <span className="block">
                                        {lang === "ja"
                                            ? activeStrength.highlightJa
                                            : activeStrength.highlightEn}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 pt-3">
                                    <Link
                                        to="/contact-sales"
                                        className="sf-cta-btn text-sm md:text-base !font-semibold !py-2.5 !px-6"
                                    >
                                        {lang === "ja"
                                            ? "ユースケースを相談する"
                                            : "Talk to us about your use case"}
                                    </Link>
                                    <Link
                                        to="/docs/getting-started"
                                        className="inline-flex items-center justify-center rounded-full border border-slate-400 px-5 py-2 text-sm font-semibold text-slate-800 hover:border-slate-600 hover:text-slate-900"
                                    >
                                        {lang === "ja" ? "ドキュメントを見る" : "View documentation"}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex items-center justify-center md:justify-end">
                            <div className="relative w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden">
                                {/* Image 1 */}
                                <img
                                    src={getAssetUrl("Strength1.png")}
                                    alt={lang === "ja" ? "プロダクション向けAPI設計" : "Production-ready API design"}
                                    className={`w-full h-auto transition-opacity duration-700 ease-in-out ${strengthIndex === 0 ? "opacity-100" : "opacity-0 absolute inset-0"
                                        }`}
                                />
                                {/* Image 2 */}
                                <img
                                    src={getAssetUrl("Strength2.png")}
                                    alt={lang === "ja" ? "AIゲートウェイ" : "AI Gateway"}
                                    className={`w-full h-auto transition-opacity duration-700 ease-in-out ${strengthIndex === 1 ? "opacity-100" : "opacity-0 absolute inset-0"
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StrengthSection;
