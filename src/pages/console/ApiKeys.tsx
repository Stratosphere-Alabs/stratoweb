import React from "react";
import { useLanguage } from "../../LanguageContext";

const ApiKeys: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {lang === "ja" ? "API キー" : "API Keys"}
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            {lang === "ja"
              ? "API キーの管理画面です。現時点ではプレースホルダーのみ実装されています。"
              : "Manage your API keys. This is currently a placeholder page."}
          </p>
        </header>
      </main>
    </div>
  );
};

export default ApiKeys;