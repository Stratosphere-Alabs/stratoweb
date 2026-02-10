import React from "react";
import { useLanguage } from "../../LanguageContext";

const Settings: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {lang === "ja" ? "設定" : "Settings"}
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            {lang === "ja"
              ? "チーム・ワークスペース・通知などの設定画面です。現時点ではプレースホルダーのみ実装されています。"
              : "Manage team, workspace, and notification settings. This is currently a placeholder page."}
          </p>
        </header>
      </main>
    </div>
  );
};

export default Settings;