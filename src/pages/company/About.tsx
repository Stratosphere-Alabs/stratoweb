import React, { useState, useEffect } from "react";
import { useLanguage } from "../../LanguageContext";
import Header from "@/components/Header";
import { getAssetUrl } from "../../utils/assets";

// Typewriter Hook - single text, no loop
const useTypewriter = (text: string, typingSpeed = 50) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blinking - only when not complete
  useEffect(() => {
    if (isComplete) {
      setShowCursor(false);
      return;
    }
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [isComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    setShowCursor(true);
  }, [text]);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (text && displayText === text) {
      setIsComplete(true);
    }
  }, [displayText, text, typingSpeed]);

  return { displayText, showCursor, isComplete };
};

const About: React.FC = () => {
  const { lang } = useLanguage();

  const missionText = lang === "ja"
    ? "AIインフラを提供することで、生成AIの導入ハードルを下げ、企業が安心・適正なコストでAIの価値を最大限に活用できる社会を実現する。"
    : "By providing AI infrastructure, we lower the barrier to adopting generative AI, enabling companies to maximize the value of AI at a fair and secure cost.";

  const visionText = lang === "ja"
    ? "次世代 AI インフラプラットフォームとして、AIを「使える技術」から「持続的に活用できる社会基盤」へと進化させる。"
    : "As a next-generation AI infrastructure platform, evolving AI from 'usable technology' to 'sustainable social infrastructure'.";

  const { displayText, showCursor, isComplete } = useTypewriter(missionText, 40);

  // Current phase: 0 = Mission visible, 1 = Vision visible
  const [currentPhase, setCurrentPhase] = useState(0);

  // Track scroll to trigger phase changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Phase 0 → 1: Scroll down a bit (>50px) triggers Vision
      // Phase 1 → 0: Scroll back to top (<30px) triggers Mission
      if (currentPhase === 0 && scrollY > 50) {
        setCurrentPhase(1);
      } else if (currentPhase === 1 && scrollY < 30) {
        setCurrentPhase(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPhase]);

  return (
    <div className="min-h-screen font-sans text-[#1A1A1A]">
      {/* ================= HEADER (Fixed at top) ================= */}
      <Header position="fixed" variant="transparent" />

      {/* ================= HERO - FIXED BACKGROUND ================= */}
      <section
        className="fixed inset-x-0 top-0 z-0 h-screen"
      >
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <img
            src={getAssetUrl("sf-about.jpg")}
            alt="Corporate background"
            className="h-full w-full object-cover"
          />
          {/* Subtle dark overlay for depth - Darkened for better text contrast */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content Container */}
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 md:px-6 lg:px-8 pt-32 pb-20 md:pt-40">

          {/* ===== MISSION SECTION - Fades out quickly on scroll ===== */}
          <div
            className={`absolute inset-0 flex flex-col justify-center px-4 md:px-6 lg:px-8 transition-all duration-300 ease-out ${currentPhase === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
          >
            {/* Mission Label */}
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-white/50" />
              <span className="text-xl font-medium uppercase tracking-[0.15em] text-white/70">
                {lang === "en" ? "Mission" : "Mission"}
              </span>
            </div>

            {/* Main Typewriter Text */}
            <div className="min-h-[100px] md:min-h-[120px]">
              <p className="text-xl font-bold leading-[1.8] tracking-wide text-white md:text-2xl lg:text-3xl max-w-5xl">
                {displayText}
                {!isComplete && (
                  <span
                    className={`ml-1 inline-block h-[1.1em] w-[3px] translate-y-[0.1em] bg-sky-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}
              </p>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${isComplete ? 'opacity-60' : 'opacity-0'}`}>
              <span className="text-xs uppercase tracking-widest text-white/60">Scroll</span>
              <div className="h-8 w-[1px] bg-white/40 animate-pulse" />
            </div>
          </div>

          {/* ===== VISION SECTION - Slides up smoothly, fades in ===== */}
          <div
            className={`absolute inset-0 flex flex-col justify-center px-4 md:px-6 lg:px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${currentPhase === 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-24 pointer-events-none'
              }`}
          >
            {/* Vision Label */}
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-white/50" />
              <span className="text-xl font-medium uppercase tracking-[0.15em] text-white/70">
                {lang === "en" ? "Vision" : "Vision"}
              </span>
            </div>

            {/* Vision Text */}
            <div className="min-h-[100px] md:min-h-[120px]">
              <p className="text-xl font-bold leading-[1.8] tracking-wide text-white md:text-2xl lg:text-3xl max-w-5xl">
                {visionText}
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
              <span className="text-xs uppercase tracking-widest text-white/60">Scroll</span>
              <div className="h-8 w-[1px] bg-white/40 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for Mission + Vision sections (2 screens) */}
      <div className="h-[200vh]" />

      {/* ================= MAIN CONTENT (Slides over the hero) ================= */}
      <main
        className="relative z-10 min-h-screen bg-[#F2F2F2] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.06)]"
        style={{ borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}
      >
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pb-20 pt-16 md:pt-24">

          {/* ================= 会社情報 SECTION ================= */}
          <section id="company-info" className="relative mb-24">
            {/* Section Title */}
            <div className="relative pt-8 md:pt-12">
              {/* Background "Company" text - positioned to overlap with title */}
              <div className="pointer-events-none absolute -top-2 left-0 select-none md:-top-4">
                <span className="text-[5rem] md:text-[8rem] font-bold leading-none text-[#E1E1E1] tracking-tight">
                  Company
                </span>
              </div>

              <h1 className="relative z-10 mb-14 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {lang === "ja" ? "会社情報" : "Company"}
              </h1>

              {/* Description */}
              <div className="space-y-4 text-[19px] leading-[200%] tracking-[0.1em] text-[#1D293D]">
                {lang === "ja" ? (
                  <>
                    <p>
                      Stratoflow株式会社は、生成AIを安全かつ実用的に活用するためのAI APIおよびAIゲートウェイを提供するテクノロジー企業です。
                    </p>
                    <p>
                      生成AIの導入にあたっては、モデルやクラウドベンダーごとに認証管理、利用制御、ログ管理などが分断されやすく、運用やセキュリティ面での課題が生じやすいのが現状です。


                      Stratoflowは、生成AIへのアクセスを共通のAPIおよびゲートウェイで整理し、企業や開発者が安心してAIを導入・運用できる環境づくりを支援しています。


                      現在は、テキスト生成や画像生成などの生成AI機能をAPIとして提供し、プロダクション環境での安定した利用を重視した運用を行っています。
                    </p>
                    <p>
                      今後は、複数モデルや推論基盤をより柔軟に扱える推論レイヤーの構築を視野に入れ、生成AIの利用を社会インフラとして支える存在を目指していきます。
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Stratoflow Inc. is a technology company that provides AI APIs and AI Gateways for safe and practical use of generative AI.
                    </p>
                    <p>
                      When adopting generative AI, authentication management, usage control, and log management tend to be fragmented by model and cloud vendor, leading to operational and security challenges.
                    </p>
                    <p>
                      Stratoflow organizes access to generative AI through common APIs and gateways, supporting businesses and developers in creating an environment where they can confidently deploy and operate AI.
                    </p>
                    <p>
                      Currently, we provide generative AI capabilities such as text generation and image generation as APIs, with a focus on stable operation in production environments.
                    </p>
                    <p>
                      Going forward, we aim to build an inference layer that can handle multiple models and inference infrastructure more flexibly, with the goal of becoming a foundation that supports the use of generative AI as social infrastructure.
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* ================= 会社概要 SECTION ================= */}
          <section id="company-profile" className="mb-24">
            <h2 className="mb-14 text-2xl font-bold text-slate-900 md:text-3xl">
              {lang === "ja" ? "会社概要" : "Company Overview"}
            </h2>

            {/* Company Info Table */}
            <div className="overflow-hidden rounded-sm bg-white">
              <dl className="divide-y divide-slate-100 text-sm md:text-base">
                {/* 会社名 */}
                <div className="flex flex-col px-8 py-6 md:flex-row md:items-center md:px-10 md:py-7">
                  <dt className="w-40 shrink-0 font-bold text-slate-800 pb-1 md:pb-0">
                    {lang === "ja" ? "会社名" : "Company name"}
                  </dt>
                  <dd className="text-[#45556C]">
                    {lang === "ja" ? "Stratoflow株式会社" : "Stratoflow Inc."}
                  </dd>
                </div>

                {/* 設立 */}
                <div className="flex flex-col px-8 py-6 md:flex-row md:items-center md:px-10 md:py-7">
                  <dt className="w-40 shrink-0 font-bold text-slate-800 pb-1 md:pb-0">
                    {lang === "ja" ? "設立" : "Founded"}
                  </dt>
                  <dd className="text-[#45556C]">
                    {lang === "ja" ? "令和7年8月1日" : "August 1, 2025"}
                  </dd>
                </div>

                {/* 代表者名 */}
                <div className="flex flex-col px-8 py-6 md:flex-row md:items-center md:px-10 md:py-7">
                  <dt className="w-40 shrink-0 font-bold text-slate-800 pb-1 md:pb-0">
                    {lang === "ja" ? "代表者名" : "Representative"}
                  </dt>
                  <dd className="text-[#45556C]">WANG YUXIANG</dd>
                </div>

                {/* 資本金 */}
                <div className="flex flex-col px-8 py-6 md:flex-row md:items-center md:px-10 md:py-7">
                  <dt className="w-40 shrink-0 font-bold text-slate-800 pb-1 md:pb-0">
                    {lang === "ja" ? "資本金" : "Capital"}
                  </dt>
                  <dd className="text-[#45556C]">
                    {lang === "ja" ? "500万円" : "5,000,000 JPY"}
                  </dd>
                </div>

                {/* 所在地 */}
                <div className="flex flex-col px-8 py-6 md:flex-row md:items-center md:px-10 md:py-7">
                  <dt className="w-40 shrink-0 font-bold text-slate-800 pb-1 md:pb-0">
                    {lang === "ja" ? "所在地" : "Location"}
                  </dt>
                  <dd className="text-[#45556C]">
                    {lang === "ja"
                      ? "〒533-0005 大阪府大阪市東淀川区瑞光１−２−１１−４０１"
                      : "1-2-11-401 Zuiko, Higashiyodogawa-ku, Osaka-shi, Osaka 533-0005, Japan"}
                  </dd>
                </div>

                {/* 連絡メール */}
                <div className="flex flex-col px-8 py-6 md:flex-row md:items-center md:px-10 md:py-7">
                  <dt className="w-40 shrink-0 font-bold text-slate-800 pb-1 md:pb-0">
                    {lang === "ja" ? "連絡メール" : "Contact Email"}
                  </dt>
                  <dd className="text-[#45556C]">
                    <a
                      href="mailto:info@stratoflow.ai"
                      className="text-sky-600 hover:text-sky-700 hover:underline"
                    >
                      info@stratoflow.ai
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* ================= アクセス SECTION ================= */}
          <section id="access" className="relative mb-20">
            {/* Section Title */}
            <div className="relative pt-8 md:pt-12">
              {/* Background "Access" text - positioned to overlap with title */}
              <div className="pointer-events-none absolute -top-2 left-0 select-none md:-top-4">
                <span className="text-[5rem] md:text-[8rem] font-bold leading-none text-[#E1E1E1] tracking-tight">
                  Access
                </span>
              </div>

              <h2 className="relative z-10 mb-14 text-2xl font-bold text-slate-900 md:text-3xl">
                {lang === "ja" ? "アクセス" : "Access"}
              </h2>

              {/* Map Container */}
              <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
                {/* Google Maps Embed - Osaka Higashiyodogawa-ku */}
                <div className="relative h-72 w-full overflow-hidden md:h-96">
                  <iframe
                    src="https://maps.google.com/maps?q=大阪府大阪市東淀川区瑞光1丁目&t=&z=16&ie=UTF8&iwloc=&output=embed&hl=ja"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Stratoflow Office Location"
                    className="grayscale-[20%]"
                  />
                </div>

                {/* Address Info */}
                <div className="px-6 py-5">
                  <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
                    STRATOFLOW OFFICE
                  </h3>
                  <p className="text-sm text-slate-600 md:text-base">
                    {lang === "ja"
                      ? "〒533-0005 大阪府大阪市東淀川区瑞光１−２−１１−４０１"
                      : "1-2-11-401 Zuiko, Higashiyodogawa-ku, Osaka-shi, Osaka 533-0005, Japan"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;