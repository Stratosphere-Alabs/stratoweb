import React from "react";
import { useLanguage } from "../../LanguageContext";

const Dashboard: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {lang === "ja" ? "ダッシュボード" : "Dashboard"}
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            {lang === "ja"
              ? "API 利用状況、モデルごとの推論量、請求サマリーを一元的に確認できます。"
              : "View API usage, inference volume per model, and billing summary in one place."}
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">
              {lang === "ja" ? "今日のリクエスト数" : "Today's Requests"}
            </p>
            <p className="mt-3 text-2xl font-bold">—</p>
            <p className="mt-1 text-xs text-slate-500">
              {lang === "ja" ? "集計中" : "Aggregating"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">
              {lang === "ja" ? "本日のエラー率" : "Today's Error Rate"}
            </p>
            <p className="mt-3 text-2xl font-bold">—</p>
            <p className="mt-1 text-xs text-slate-500">HTTP 4xx / 5xx</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">
              {lang === "ja" ? "本日の推定コスト" : "Today's Estimated Cost"}
            </p>
            <p className="mt-3 text-2xl font-bold">—</p>
            <p className="mt-1 text-xs text-slate-500">
              {lang === "ja" ? "請求単価に基づく概算" : "Estimate based on billing rates"}
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
          <h2 className="text-sm font-semibold text-slate-900 md:text-base">
            {lang === "ja" ? "最近のアクティビティ" : "Recent Activity"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {lang === "ja"
              ? "まだアクティビティはありません。API キーを作成して、最初のリクエストを送信しましょう。"
              : "No activity yet. Create an API key and send your first request."}
          </p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;