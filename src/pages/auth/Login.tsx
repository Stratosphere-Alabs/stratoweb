import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import Header from "@/components/Header";

/**
 * Demo 用登录/注册页面
 * 这里并不做真实认证，而是用于加入 Stratoflow Console 等候名单的表单。
 */
const LoginWaitingList: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [scale, setScale] = useState("pilot");
  const [optInMarketing, setOptInMarketing] = useState(true);

  const { lang } = useLanguage();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    try {
      // TODO: 这里调用后端接口提交
      console.log("Waiting List submitted:", {
        name,
        email,
        company,
        useCase,
        scale,
        optInMarketing,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Waiting List submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-slate-800">
      {/* 全ページ共通ヘッダー */}
      <Header position="fixed" variant="transparent" />

      {/* ログイン / Waiting List 本文 */}
      <main className="mx-auto flex max-w-[1400px] flex-col items-center justify-center px-4 md:px-6 lg:px-8 pt-32 pb-16">
        <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white px-6 py-8 md:px-10 md:py-10">
          {/* Demo / Closed β バッジ */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>
              {lang === "ja"
                ? "Demo / Closed β — ログインは Waiting List による事前登録のみ"
                : "Demo / Closed β — Login is limited to users on the Waiting List."}
            </span>
          </div>

          {!isSubmitted ? (
            <>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                {lang === "ja"
                  ? "Stratoflow Console Waiting List"
                  : "Stratoflow Console Waiting List"}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                {lang === "ja" ? (
                  <>
                    現在、Stratoflow Console は
                    <span className="font-medium"> クローズド β 版</span>
                    として提供しています。ログイン / 新規登録の代わりに、以下のフォームから
                    Waiting List にご登録ください。
                  </>
                ) : (
                  <>
                    Stratoflow Console is currently offered as a
                    <span className="font-medium"> closed β</span>. Instead of
                    direct login or sign-up, please join the Waiting List using
                    the form below.
                  </>
                )}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5 md:space-y-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-medium text-slate-700 md:text-sm"
                    >
                      {lang === "ja" ? "お名前" : "Name"}{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      placeholder={
                        lang === "ja" ? "山田 太郎" : "Taro Yamada"
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="company"
                      className="text-xs font-medium text-slate-700 md:text-sm"
                    >
                      {lang === "ja"
                        ? "会社名 / チーム名"
                        : "Company / Team"}
                    </label>
                    <input
                      id="company"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      placeholder={
                        lang === "ja"
                          ? "Stratoflow Inc. / AI 推進室"
                          : "Stratoflow Inc. / AI Team"
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-slate-700 md:text-sm"
                  >
                    {lang === "ja" ? "メールアドレス" : "Email address"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    placeholder="you@example.com"
                  />
                  <p className="text-[11px] text-slate-400">
                    {lang === "ja"
                      ? "招待リンクの送付に使用します。プロダクト関連のご案内以外には利用しません。"
                      : "We use this address only to send invitation links and product-related information."}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="useCase"
                    className="text-xs font-medium text-slate-700 md:text-sm"
                  >
                    {lang === "ja"
                      ? "想定しているユースケース"
                      : "Planned use cases"}
                  </label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    rows={3}
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    placeholder={
                      lang === "ja"
                        ? "例：社内ナレッジ検索、カスタマーサポート向けチャットボット、レコメンドなど"
                        : "e.g. internal knowledge search, CS chatbot, recommendation features, etc."
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="scale"
                    className="text-xs font-medium text-slate-700 md:text-sm"
                  >
                    {lang === "ja"
                      ? "利用予定の規模感"
                      : "Estimated scale of use"}
                  </label>
                  <select
                    id="scale"
                    name="scale"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  >
                    <option value="pilot">
                      {lang === "ja"
                        ? "まずは小規模な PoC / パイロットから"
                        : "Starting with a small PoC / pilot"}
                    </option>
                    <option value="department">
                      {lang === "ja"
                        ? "特定部署での本番運用を想定"
                        : "Production use in a specific department"}
                    </option>
                    <option value="company-wide">
                      {lang === "ja"
                        ? "全社展開を視野に入れている"
                        : "Planning for company-wide rollout"}
                    </option>
                    <option value="undecided">
                      {lang === "ja"
                        ? "まだ具体的には決まっていない"
                        : "Not decided yet"}
                    </option>
                  </select>
                </div>

                {/* メール配信オプトイン */}
                <div className="mt-1 flex items-start gap-2">
                  <input
                    id="optInMarketing"
                    type="checkbox"
                    checked={optInMarketing}
                    onChange={(e) => setOptInMarketing(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="optInMarketing"
                    className="text-[11px] leading-relaxed text-slate-500 md:text-xs"
                  >
                    {lang === "ja"
                      ? "登録いただいたメールアドレス宛に、Stratoflow からのお知らせメールを受け取ります。"
                      : "I agree to receive update emails from Stratoflow at this address."}
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="sf-cta-btn w-full text-sm sm:w-auto"
                  >
                    {isSubmitting
                      ? lang === "ja"
                        ? "送信中..."
                        : "Submitting..."
                      : lang === "ja"
                        ? "Waiting List に登録"
                        : "Join the Waiting List"}
                  </button>
                  <p className="text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                    {lang === "ja" ? (
                      <>
                        ログイン / 新規登録は正式リリース後にご案内いたします。
                        <br className="hidden sm:block" />
                        ご登録いただいた方から順に、招待リンクをメールでお送りします。
                      </>
                    ) : (
                      <>
                        Login / sign-up will be opened after the official
                        release.
                        <br className="hidden sm:block" />
                        Invitation links will be sent by email in the order of
                        registration.
                      </>
                    )}
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="py-4">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <span className="text-lg">✓</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                {lang === "ja"
                  ? "Waiting List へのご登録ありがとうございます。"
                  : "Thank you for joining the Waiting List."}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                {lang === "ja"
                  ? "ご入力いただいたメールアドレス宛に、クローズド β 版または正式リリースのタイミングで招待リンクをご案内いたします。"
                  : "We will send an invitation link to the email address you provided when the closed β or official release is available."}
              </p>
              <p className="mt-4 text-xs text-slate-500 md:text-sm">
                {lang === "ja"
                  ? "ログイン機能は現在停止しています。招待メールを受け取られた後、あらためて Console にサインインできるようになります。"
                  : "Login is currently disabled. Once you receive the invitation email, you will be able to sign in to the Console."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/"
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {lang === "ja" ? "ホームに戻る" : "Back to home"}
                </Link>
                <Link
                  to="/docs"
                  className="sf-link-arrow text-xs font-medium text-slate-600 hover:text-slate-900 md:text-sm"
                >
                  <span className="sf-link-arrow-label">
                    {lang === "ja"
                      ? "API ドキュメントを見る"
                      : "View API documentation"}
                  </span>
                  <svg
                    viewBox="0 0 13 20"
                    aria-hidden="true"
                    className="sf-link-arrow-icon"
                  >
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>

        {!isSubmitted && (
          <div className="mt-4 w-full max-w-3xl text-[10px] leading-relaxed text-slate-400 md:text-[11px]">
            <p>
              {lang === "ja"
                ? "ご登録をもって "
                : "By registering, you agree to the "}
              <a
                href="/legal/terms"
                className="underline decoration-slate-400 decoration-dotted underline-offset-2 hover:text-slate-600"
              >
                {lang === "ja" ? "利用規約" : "Terms of Use"}
              </a>
              {lang === "ja" ? " および " : " and "}
              <a
                href="/legal/privacy"
                className="underline decoration-slate-400 decoration-dotted underline-offset-2 hover:text-slate-600"
              >
                {lang === "ja" ? "プライバシーポリシー" : "Privacy Policy"}
              </a>
              {lang === "ja" ? " に同意したものとみなします。" : "."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LoginWaitingList;
