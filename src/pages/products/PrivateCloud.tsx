import React from "react";
import Header from "@/components/Header";
import { useLanguage } from "../../LanguageContext";

const PrivateCloud: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header position="fixed" variant="transparent" />
      {/* Main content: placeholder */}
      <main className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pt-32 pb-16">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center text-sm text-slate-500 md:text-base">
          {lang === "ja"
            ? "Private Cloud プレースホルダー..."
            : "Private Cloud Placeholder..."}
        </div>
      </main>
    </div>
  );
};

export default PrivateCloud;