import React, { useState } from "react";
import { useLanguage } from "../../LanguageContext";

interface FaqItem {
    questionJa: string;
    questionEn: string;
    answerJa: string;
    answerEn: string;
}

const faqData: FaqItem[] = [
    {
        questionJa: "Stratoflowはどのようなサービスですか？",
        questionEn: "What kind of service is Stratoflow?",
        answerJa: "Stratoflowは、生成AI機能をAPIとして提供するAI SaaSです。テキスト生成や埋め込み（Embeddings）などの生成AIを、企業や開発者が安全かつシンプルに利用できるよう設計されています。",
        answerEn: "Stratoflow is an AI SaaS that provides generative AI capabilities as APIs. It is designed to allow businesses and developers to safely and simply use generative AI such as text generation and embeddings."
    },
    {
        questionJa: "OpenAI APIなどと何が違いますか？",
        questionEn: "How is it different from OpenAI API?",
        answerJa: "各モデルのAPIを直接利用する場合、認証管理・利用制御・ログ管理などを個別に実装する必要があります。Stratoflowは、生成AIへのアクセスを共通のゲートウェイで管理し、APIキー、権限、利用状況を一元的に可視化・運用できる点が特徴です。",
        answerEn: "When using each model's API directly, you need to implement authentication, usage control, and log management separately. Stratoflow manages access to generative AI through a common gateway, allowing you to centrally visualize and manage API keys, permissions, and usage."
    },
    {
        questionJa: "複数の生成AIモデルを利用できますか？",
        questionEn: "Can I use multiple generative AI models?",
        answerJa: "はい、用途に応じて複数の生成AIモデルを利用できます。現在は各モデルをAPIとして提供しており、将来的にはモデルの切り替えや管理をより簡単に行える仕組みを検討しています。",
        answerEn: "Yes, you can use multiple generative AI models according to your needs. Currently, we provide each model as an API, and in the future, we are considering mechanisms to make it easier to switch and manage models."
    },
    {
        questionJa: "利用料金はどのように決まりますか？",
        questionEn: "How are usage fees determined?",
        answerJa: "利用料金は、使用するAPIの種類や利用量に応じて決まります。詳細な料金体系については、個別にご案内しています。",
        answerEn: "Usage fees are determined based on the type of API used and the amount of usage. We provide detailed pricing information on an individual basis."
    },
    {
        questionJa: "APIに詳しくない担当者でも利用できますか？",
        questionEn: "Can staff who are not familiar with APIs use it?",
        answerJa: "はい。Stratoflowは「このゲートウェイを通してAIを利用する」という考え方で設計されており、APIの詳細に詳しくない方でも、社内ルールに沿った形で生成AIを導入・運用できます。",
        answerEn: "Yes. Stratoflow is designed with the concept of 'using AI through this gateway,' allowing even those unfamiliar with API details to deploy and operate generative AI in accordance with internal rules."
    }
];

const FaqSection: React.FC = () => {
    const { lang } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
            {/* 极简背景装饰 */}
            <div className="pointer-events-none absolute inset-0">
                {/* 右上淡淡放射渐变 */}
                <div
                    className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-60"
                    style={{ background: 'radial-gradient(circle, rgba(191, 219, 254, 0.5) 0%, transparent 70%)' }}
                />
                {/* 左下柔和光晕 */}
                <div
                    className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-50"
                    style={{ background: 'radial-gradient(circle, rgba(203, 213, 225, 0.6) 0%, transparent 70%)' }}
                />
                {/* 中心极淡光斑 */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 60%)' }}
                />
            </div>

            <div className="relative mx-auto max-w-[900px] px-4 md:px-6 lg:px-8">
                {/* 区块标题 */}
                <div className="mb-14 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        FAQ
                    </div>
                    <h2 className="text-2xl font-bold text-black md:text-3xl">
                        {lang === "ja" ? "よくある質問" : "Frequently Asked Questions"}
                    </h2>
                </div>

                {/* FAQ 手风琴 - 黑白极简风 */}
                <div className="divide-y divide-black/10 border-t border-b border-black/10">
                    {faqData.map((faq, index) => (
                        <div key={index}>
                            {/* 问题按钮 */}
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between py-8 text-left group"
                            >
                                <span className="text-base font-semibold text-black pr-4 md:text-lg">
                                    {lang === "ja" ? faq.questionJa : faq.questionEn}
                                </span>
                                <span
                                    className={`shrink-0 text-black transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""
                                        }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                </span>
                            </button>

                            {/* 答案面板 */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-out ${openIndex === index
                                    ? "max-h-96 opacity-100 pb-6"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed text-black/70 md:text-base pr-10">
                                    {lang === "ja" ? faq.answerJa : faq.answerEn}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 联系销售 CTA，嵌在 FAQ 区块内 */}
                <div className="mt-16">
                    <div className="rounded-[25px] border border-slate-200 bg-white px-8 py-8 md:px-12 md:py-10">
                        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                                    {lang === "ja"
                                        ? "まずはユースケースとインフラの状況からお聞かせください。"
                                        : "Tell us about your use case and current infrastructure first."}
                                </h3>
                                <p className="text-sm text-slate-500 md:text-base">
                                    {lang === "ja"
                                        ? "Contact Sales から PoC / 本番運用まで、技術・ビジネス両面でご支援します。"
                                        : "From PoC to production, our team can support you on both the technical and business sides."}
                                </p>
                            </div>
                            <a
                                href="/contact-sales"
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
                                aria-label="Contact Sales"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
