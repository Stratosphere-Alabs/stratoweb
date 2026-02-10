import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "../../LanguageContext";

const ModelDetail: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-800">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12 lg:px-10">
        <nav className="mb-4 text-xs text-slate-500 md:text-sm">
          <ol className="flex items-center gap-1">
            <li>
              <Link
                to="/"
                className="hover:text-slate-900 hover:underline underline-offset-4"
              >
                {lang === "ja" ? "ホーム" : "Home"}
              </Link>
            </li>
            <li className="px-1 text-slate-400">/</li>
            <li>
              <Link
                to="/models"
                className="hover:text-slate-900 hover:underline underline-offset-4"
              >
                {lang === "ja" ? "モデル" : "Models"}
              </Link>
            </li>
            <li className="px-1 text-slate-400">/</li>
            <li className="font-medium text-slate-700">
              {modelId ?? (lang === "ja" ? "モデル" : "Model")}
            </li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {lang === "ja" ? "モデル詳細（プレースホルダー）" : "Model Details (Placeholder)"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
          {lang === "ja"
            ? "ここはモデル詳細ページのプレースホルダーです。後で実際のモデル仕様・パフォーマンス・料金などの情報を追加できます。"
            : "This is a placeholder for the model detail page. Model specifications, performance metrics, and pricing information will be added here."}
        </p>
      </main>
    </div>
  );
};

export default ModelDetail;