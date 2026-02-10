import React, { useState, useMemo } from "react";
import ModelGallery from "@/components/ModelGallery";
import type { SortByType } from "@/components/ModelGallery";
import Header from "@/components/Header";
import { useLanguage } from "@/LanguageContext";
import { CAROUSEL_MODELS } from "@/data/models";
import { getAssetUrl } from "@/utils/assets";


const ModelsIndex: React.FC = () => {
  const { lang } = useLanguage();

  // Calculate available tags and orgs from data
  const availableTags = useMemo(() => Array.from(new Set(CAROUSEL_MODELS.flatMap(m => m.tags))), []);
  const availableOrgs = useMemo(() => Array.from(new Set(CAROUSEL_MODELS.map(m => m.org))), []);

  // Filter state
  const [q, setQ] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("すべて");
  const [orgFilter, setOrgFilter] = useState<string>("すべて");
  const [sortBy, setSortBy] = useState<SortByType>("デフォルト");

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans text-slate-900 pb-24">
      {/* 顶部导航 */}
      <Header position="fixed" variant="transparent" />

      {/* Immersive Hero Section with Background Image */}
      <section id="hero" className="relative min-h-[40vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${getAssetUrl("hero2.png")}')`,
          }}
        />
        {/* Simple dark overlay - no gradient */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 text-center pt-32 pb-20 flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium uppercase tracking-wider mb-6 mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {lang === "ja" ? "モデルライブラリ" : "Model Library"}
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight">
            {lang === "ja" ? "まもなく登場" : "Coming Soon"}
          </h1>
          <p className="mt-4 text-base text-white/70 md:text-lg max-w-2xl mx-auto">
            {lang === "ja"
              ? "世界中の最先端モデルへ、たった一つのAPIから即座にアクセス。"
              : "Instant access to the world's leading AI models through a single API."}
          </p>
        </div>
      </section>

      {/* Main Content Area - Light Background */}
      <div className="relative z-20 mx-auto max-w-[1400px] w-full px-4 md:px-6 lg:px-8 pt-10 pb-8">
        {/* Liquid Glass / White Filter Bar */}
        <div id="search-section" className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-md p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* 検索 */}
            <div className="lg:col-span-1">
              <input
                id="model-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "ja" ? "モデル / 組織 / タグで検索…" : "Search models, orgs, tags..."}
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
              />
            </div>
            {/* タグで絞り込み */}
            <div>
              <select
                id="model-tag-filter"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-400"
                aria-label={lang === "ja" ? "タグで絞り込み" : "Filter by tag"}
              >
                <option value="すべて">{lang === "ja" ? "すべてのタグ" : "All tags"}</option>
                {availableTags.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            {/* 提供元で絞り込み */}
            <div>
              <select
                id="model-org-filter"
                value={orgFilter}
                onChange={(e) => setOrgFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-400"
                aria-label={lang === "ja" ? "提供元で絞り込み" : "Filter by provider"}
              >
                <option value="すべて">{lang === "ja" ? "すべての提供元" : "All providers"}</option>
                {availableOrgs.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            {/* 並び替え */}
            <div>
              <select
                id="model-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortByType)}
                className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-400"
                aria-label={lang === "ja" ? "並び替え" : "Sort by"}
              >
                <option value="デフォルト">{lang === "ja" ? "デフォルト（名前順）" : "Default (by name)"}</option>
                <option value="人気順">{lang === "ja" ? "人気順（おすすめ）" : "Most popular"}</option>
                <option value="価格の安い順">{lang === "ja" ? "価格の安い順" : "Price: low to high"}</option>
                <option value="価格の高い順">{lang === "ja" ? "価格の高い順" : "Price: high to low"}</option>
                <option value="レイテンシP50">{lang === "ja" ? "レイテンシ（P50）" : "Latency (P50)"}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Model Gallery - Cards only, connected to filter state */}
      <ModelGallery
        filterInHero
        externalQ={q}
        externalSetQ={setQ}
        externalTagFilter={tagFilter}
        externalSetTagFilter={setTagFilter}
        externalOrgFilter={orgFilter}
        externalSetOrgFilter={setOrgFilter}
        externalSortBy={sortBy}
        externalSetSortBy={setSortBy}
      />
      {/* Disclaimer above footer / separator */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 mt-8 mb-4">
        <p className="text-xs text-slate-500 text-right">
          ※ 本ページに掲載されている画像・動画等の視覚的表現は、すべて当該生成AIモデルによって生成されたものです。
        </p>
      </div>

      {/* Contact CTA */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 mt-0 mb-0">
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {lang === "ja" ? "お探しのモデルが見つかりませんか？" : "Can't find the model you're looking for?"}
          </h3>
          <p className="text-slate-600 mb-6">
            {lang === "ja" ? "お気軽にお問い合わせください。" : "Please feel free to contact us."}
          </p>
          <a
            href="/contact-sales"
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors"
          >
            {lang === "ja" ? "お問い合わせ" : "Contact Us"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModelsIndex;