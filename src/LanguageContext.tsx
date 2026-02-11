// 语言上下文定义
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Lang = "ja" | "en";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>("ja");

  // 刷新后也记住上次选的语言
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("sf-lang");
      if (stored === "ja" || stored === "en") {
        setLangState(stored);
      }
    } catch {
      // 忽略本地存储异常
    }
  }, []);

  const setLang = (value: Lang) => {
    setLangState(value);
    try {
      window.localStorage.setItem("sf-lang", value);
    } catch {
      // 忽略本地存储异常
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
};
