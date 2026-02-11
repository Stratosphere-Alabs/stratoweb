import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../LanguageContext";
import Header from "@/components/Header";
import { api } from "@/lib/api";

const ContactSales: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 绘制波浪线背景（与首页一致）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const width = canvas.clientWidth || canvas.width || 1000;
      const height = canvas.clientHeight || canvas.height || 500;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, width, height);

      const lines = 20;
      const maxAmplitude = 30;
      const gap = height / lines;

      ctx.lineWidth = 1.5;

      for (let i = 0; i <= lines; i++) {
        ctx.beginPath();

        const depthRatio = i / lines;
        const alpha = 0.1 + depthRatio * 0.5;
        ctx.strokeStyle = `rgba(219, 219, 219, ${alpha})`;

        const yBase = i * gap;

        for (let x = 0; x < width; x += 2) {
          const xRatio = x / width;
          const growFactor = Math.pow(xRatio, 1);
          const currentAmp = growFactor * maxAmplitude;

          const wave = Math.sin(x * 0.01 + i * 0.5);
          const yOffset = wave * currentAmp;

          if (x === 0) {
            ctx.moveTo(x, yBase + yOffset);
          } else {
            ctx.lineTo(x, yBase + yOffset);
          }
        }

        ctx.stroke();
      }
    };

    draw();

    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const company = formData.get("company") as string;

    // 前端校验
    if (!name?.trim()) {
      setStatus("error");
      setErrorMessage(lang === "ja" ? "お名前を入力してください。" : "Please enter your name.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage(lang === "ja" ? "有効なメールアドレスを入力してください。" : "Please enter a valid email address.");
      return;
    }

    if (!message?.trim() || message.trim().length < 5) {
      setStatus("error");
      setErrorMessage(lang === "ja" ? "メッセージは5文字以上で入力してください。" : "Message must be at least 5 characters.");
      return;
    }

    try {
      await api.submitInquiry({
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() || undefined,
        message: message.trim(),
        sourcePage: window.location.pathname,
      });

      setStatus("done");
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : (lang === "ja" ? "送信に失敗しました。もう一度お試しください。" : "Failed to send. Please try again.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* 全ページ共通ヘッダー */}
      <Header position="fixed" variant="transparent" />

      {/* Hero Section with Wave Background */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Wave background pattern */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 to-white">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs text-slate-600 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {lang === "ja" ? "Contact Sales" : "Contact Sales"}
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            {lang === "ja" ? "お問い合わせ" : "Get in touch"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {lang === "ja"
              ? "PoC から本番導入まで、Stratoflow の活用方法についてご相談ください。技術・ビジネス両面でサポートいたします。"
              : "From PoC to production deployment, let's discuss how Stratoflow can help your business. We provide both technical and business support."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="pb-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* Left: Info Cards */}
            <div className="space-y-6">
              {/* Feature Card 1 */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-8 transition-all hover:border-slate-200 hover:shadow-lg">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-sky-100 to-transparent opacity-60" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {lang === "ja" ? "技術相談" : "Technical Consulting"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {lang === "ja"
                      ? "マルチモデル構成・API 設計・セキュリティ要件など、技術的なご相談に対応します。"
                      : "We handle technical questions about multi-model architecture, API design, and security requirements."}
                  </p>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-8 transition-all hover:border-slate-200 hover:shadow-lg">
                <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100 to-transparent opacity-60" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {lang === "ja" ? "料金プラン" : "Pricing Plans"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {lang === "ja"
                      ? "利用規模に応じた最適なプランをご提案。PoC から本番導入まで柔軟に対応します。"
                      : "We propose optimal plans based on your usage scale. Flexible options from PoC to production."}
                  </p>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-8 transition-all hover:border-slate-200 hover:shadow-lg">
                <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-violet-100 to-transparent opacity-60" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {lang === "ja" ? "Private Cloud" : "Private Cloud"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {lang === "ja"
                      ? "オンプレミス・専用環境でのデプロイメントについてご相談いただけます。"
                      : "Consult about on-premises and dedicated environment deployments."}
                  </p>
                </div>
              </div>

              {/* Response Time Note */}
              <div className="flex items-start gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {lang === "ja" ? "通常 1〜3 営業日以内にご連絡" : "Response within 1-3 business days"}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {lang === "ja"
                      ? "お急ぎの場合はその旨をお書き添えください。"
                      : "Please indicate if your inquiry is urgent."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-10">
              {status === "done" ? (
                /* Success State */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                    {lang === "ja" ? "送信が完了しました" : "Message Sent"}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm text-slate-600">
                    {lang === "ja"
                      ? "ありがとうございます。担当者より通常 1〜3 営業日以内にご連絡いたします。"
                      : "Thank you. Our team will normally get back to you within 1–3 business days."}
                  </p>
                  <a
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    {lang === "ja" ? "ホームに戻る" : "Back to Home"}
                  </a>
                </div>
              ) : status === "error" ? (
                /* Error State */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                    {lang === "ja" ? "送信エラー" : "Submission Error"}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm text-slate-600">
                    {errorMessage}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    {lang === "ja" ? "もう一度試す" : "Try Again"}
                  </button>
                </div>
              ) : (
                /* Form State */
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-5 md:grid-cols-2">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-900">
                        {lang === "ja" ? "お名前" : "Name"} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900"
                        placeholder={lang === "ja" ? "山田 太郎" : "Taro Yamada"}
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-slate-900">
                        {lang === "ja" ? "会社名" : "Company"}
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900"
                        placeholder={lang === "ja" ? "Stratoflow 株式会社" : "Stratoflow Inc."}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-900">
                      {lang === "ja" ? "メールアドレス" : "Email"} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900"
                      placeholder="your.name@example.com"
                    />
                  </div>

                  {/* Phone (Optional) */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-900">
                      {lang === "ja" ? "お電話番号" : "Phone"}{" "}
                      <span className="text-slate-400">{lang === "ja" ? "(任意)" : "(optional)"}</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900"
                      placeholder={lang === "ja" ? "03-1234-5678" : "+81-3-1234-5678"}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-900">
                      {lang === "ja" ? "ご相談内容" : "Message"} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full resize-none rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900"
                      placeholder={
                        lang === "ja"
                          ? "例）マルチモデル構成での API 設計について相談したい / Private Cloud の導入を検討している など"
                          : "e.g. I'd like to discuss API design for multi-model architecture / Considering Private Cloud deployment"
                      }
                    />
                  </div>

                  {/* Privacy Policy */}
                  <div className="rounded-xl bg-slate-50 p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 focus:ring-offset-0"
                      />
                      <span className="text-xs leading-relaxed text-slate-600">
                        {lang === "ja" ? (
                          <>
                            <a href="/legal/privacy" className="font-medium text-slate-900 underline underline-offset-2">
                              プライバシーポリシー
                            </a>
                            に同意のうえ送信します。
                          </>
                        ) : (
                          <>
                            I agree to the{" "}
                            <a href="/legal/privacy" className="font-medium text-slate-900 underline underline-offset-2">
                              Privacy Policy
                            </a>
                            .
                          </>
                        )}
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative w-full overflow-hidden rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-70"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "submitting" ? (
                        <>
                          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {lang === "ja" ? "送信中…" : "Sending..."}
                        </>
                      ) : (
                        <>
                          {lang === "ja" ? "送信する" : "Send Message"}
                          <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactSales;
