import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useLanguage } from "../LanguageContext";
import { getAssetUrl } from "../utils/assets";
import ThreeCarousel from "../components/home/ThreeCarousel";
import StrengthSection from "../components/home/StrengthSection";
import StatsGrid from "../components/home/StatsGrid";
import FaqSection from "../components/home/FaqSection";
import FadeInView from "../components/common/FadeInView";

// 声明 UnicornStudio 类型
declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

const Home: React.FC = () => {
  const { lang } = useLanguage();

  // 组件挂载后初始化 Unicorn Studio（重复确保扫描）
  useEffect(() => {
    const initUnicornStudio = () => {
      if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
        // 重置初始化标志，确保能够重新扫描 DOM
        window.UnicornStudio.isInitialized = false;
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    // 如果脚本已加载且 init 方法存在，直接初始化
    if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
      initUnicornStudio();
    } else {
      // 否则等待脚本加载完成
      const checkInterval = setInterval(() => {
        if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
          initUnicornStudio();
          clearInterval(checkInterval);
        }
      }, 100);

      // 清理定时器
      return () => clearInterval(checkInterval);
    }
  }, []);
  return (
    <div className="relative min-h-screen text-slate-900 overflow-x-hidden">
      {/* 顶部导航 - 透明沉浸式 */}
      <Header position="fixed" variant="transparent" />

      {/* ================= HERO 背景（固定不随滚动） ================= */}
      <div className="fixed inset-x-0 top-0 z-0 h-screen bg-[#09090b]" id="hero">
        {/* Unicorn Studio 背景特效 */}
        <div className="absolute inset-0 w-full h-full">
          <div data-us-project="NMlvqnkICwYYJ6lYb064" className="absolute w-full h-full left-0 top-0"></div>
        </div>
        {/* 四周暗角渐变，柔和边缘 */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, transparent 0%, #09090b 120%)' }}
        />
      </div>

      {/* ================= 可滚动内容（首屏文本 + 主内容） ================= */}
      <div className="relative z-10">

        {/* 首屏内容，随页面滚动 */}
        <section className="flex min-h-screen items-center">
          <div className="w-full px-6 md:px-8 lg:px-10 py-32">
            <div className="mx-auto max-w-[1400px]">
              <div className="max-w-2xl space-y-8">
                {/* 小标签 */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs text-white/90 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {lang === "ja"
                    ? "生成AIを、プロダクションで使える形に。"
                    : "Put generative AI into production-ready form."}
                </div>

                {/* 主标题 */}
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold leading-[1.2] tracking-[0.03em] text-white md:text-5xl lg:text-6xl">
                    {lang === "ja" ? (
                      <>
                        生成AIを、
                        <br />
                        <span>
                          すぐに使える
                          <span className="hero-api hero-api-glow-pulse mx-1">API</span>
                          で
                        </span>
                      </>
                    ) : (
                      <>
                        Generative AI,
                        <br />
                        <span>
                          through ready-to-use <span className="hero-api hero-api-glow-pulse">API</span>s.
                        </span>
                      </>
                    )}
                  </h1>
                  <p className="max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
                    {lang === "ja" ? (
                      <>
                        Stratoflowは、生成AIモデルをAPIとして提供し、企業や開発者が迅速にAI機能をプロダクトへ組み込めるよう支援します。
                      </>
                    ) : (
                      <>
                        Stratoflow provides generative AI models as APIs, helping businesses and developers rapidly integrate AI capabilities into their products.
                      </>
                    )}
                  </p>
                </div>

                {/* 行动按钮 */}
                <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
                  <a
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-white/90"
                  >
                    {lang === "ja" ? "API をはじめる" : "Get started"}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <Link
                    to="/contact-sales"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {lang === "ja" ? "お問い合わせ" : "Contact us"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 合作伙伴 LOGO 跑马灯（透明覆盖在首屏背景上） ================= */}
        <section className="relative py-2 md:py-4 overflow-hidden -mt-24 md:-mt-32">
          <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
              {lang === "ja" ? "公開予定" : "Trusted by innovative teams"}
            </p>

            <div className="relative">

              <div className="flex animate-marquee">
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex shrink-0 items-center gap-16 px-8">
                    {[
                      { name: 'OpenAI', src: getAssetUrl('logos/openai.svg') },
                      { name: 'Anthropic', src: getAssetUrl('logos/anthropic.svg') },
                      { name: 'Google DeepMind', src: getAssetUrl('logos/gemini.svg') },
                      { name: 'Stability AI', src: getAssetUrl('logos/stability.svg') },
                      { name: 'Midjourney', src: getAssetUrl('logos/midjourney.svg') },
                      { name: 'Runway', src: getAssetUrl('logos/flux.svg') }, // Assuming flux maps to a relevant partner or using flux logo directly
                      { name: 'ByteDance', src: getAssetUrl('logos/bytedance.svg') },
                      { name: 'DeepSeek', src: getAssetUrl('logos/deepseek.svg') },
                      { name: 'Zhipu AI', src: getAssetUrl('logos/zhipu.svg') },
                      { name: 'X.AI', src: getAssetUrl('logos/grok.svg') },
                      { name: 'Ollama', src: getAssetUrl('logos/ollama.svg') },
                      { name: 'Qwen', src: getAssetUrl('logos/qwen.svg') },
                      { name: 'Doubao', src: getAssetUrl('logos/doubao.svg') },
                      { name: 'Claude', src: getAssetUrl('logos/claude.svg') },
                    ].map((logo, i) => (
                      <div
                        key={`${setIndex}-${i}`}
                        className="flex h-10 items-center justify-center px-6"
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                          style={{ filter: 'brightness(0) invert(1)' }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS SECTION - TRANSPARENT OVER HERO BG ================= */}
        <section className="relative py-20 md:py-28">
          <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-14">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {lang === "ja" ? "APIの信頼性とパフォーマンスを重視" : "Reliability and performance you can count on"}
              </h2>
              <p className="text-sm text-white/60 mt-3 max-w-3xl mx-auto">
                {lang === "ja" ? "安定した応答性能と可用性を重視し、プロダクション用途を想定したAPI運用を行っています" : "We prioritize stable response performance and availability, operating APIs designed for production use."}
              </p>
            </div>

            {/* 带科技感动效的指标栅格 */}
            <StatsGrid lang={lang} />
          </div>
        </section>

        {/* ================= 主体内容（白底） ================= */}
        <main
          className="relative min-h-screen bg-[#F2F2F2] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.1)]"
          style={{ borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}
        >
          {/* ===== 过渡区：信任与指标 ===== */}

          {/* API 列表的过渡标题 */}
          <section className="pt-16 pb-2 md:pt-20 md:pb-4 text-center px-4">
            <div className="max-w-3xl mx-auto space-y-4">
              <FadeInView delay={0} duration={600} direction="up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  {lang === "ja" ? "モデルライブラリ" : "Model Library"}
                </div>
              </FadeInView>
              <FadeInView delay={150} duration={600} direction="up">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  {lang === "ja" ? "必要な知能を、必要な瞬間に。" : "Choose your intelligence."}
                </h2>
              </FadeInView>
              <FadeInView delay={300} duration={600} direction="up">
                <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  {lang === "ja"
                    ? "生成AI機能をAPI化し、開発と運用の負担を軽減します。"
                    : "We provide generative AI as APIs, reducing the burden of development and operations."}
                </p>
              </FadeInView>
            </div>
          </section>


          {/* API 轮播区块 */}
          <div id="model-carousel">
            <ThreeCarousel />
          </div>

        </main>

        {/* Banner + CTA - 透明叠加，露出首屏背景 */}
        <section className="relative z-10 py-16 md:py-20">
          <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
            <div className="relative md:flex md:items-center md:justify-between bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 p-10 md:p-16 overflow-hidden">
              {/* Banner 图片：填满右侧玻璃容器 */}
              <img
                src={getAssetUrl("banner.png")}
                alt="Banner"
                className="absolute right-0 top-0 h-full w-auto object-cover pointer-events-none"
              />

              {/* 文字内容 */}
              <div className="relative z-10 max-w-xl space-y-3 px-6 md:px-10">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                  {lang === "ja"
                    ? "生成AI APIを、統一されたインフラ設計で"
                    : "Generative AI APIs with unified infrastructure design"}
                </h2>
                <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                  {lang === "ja"
                    ? "Stratoflowは、生成AI機能をAPIとして提供し、モデルや基盤ごとに分断されがちな接続・運用をシンプルな構成で扱えるよう設計しています。"
                    : "Stratoflow provides generative AI as APIs, designed to simplify connections and operations that tend to be fragmented by model or infrastructure."}
                </p>
                <div className="pt-1">
                  <a
                    href="/products"
                    className="inline-flex items-center rounded-full border border-slate-400 px-5 py-2 text-sm font-semibold text-slate-50 transition-colors hover:bg-slate-50 hover:text-slate-950"
                  >
                    {lang === "ja" ? "製品を見る" : "View products"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECONDARY CONTENT (White background) ================= */}
        <div className="relative z-10 bg-[#F2F2F2] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.1)] pb-0 overflow-hidden" style={{ borderRadius: '2rem 2rem 0 0' }}>

          {/* Strength Section */}
          <div id="strength">
            <StrengthSection />
          </div>

        </div>

        {/* FAQ Section (now includes Contact Sales CTA) */}
        <div className="relative z-10" id="faq-container">
          <div id="faq">
            <FaqSection />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
