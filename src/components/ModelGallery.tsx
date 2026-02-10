"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogDescription, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { CAROUSEL_MODELS } from "@/data/models";
import { useLanguage } from "@/LanguageContext";

// ---------------------------------------------
// 数据模型定义（便于与后端 / CSV 对齐）
// ---------------------------------------------
export type PricingUnit = "per_1k_tokens" | "per_image" | "per_minute";
export type StatusFlag = "おすすめ" | "新着" | "プロ版";

export interface ModelItem {
    id: string;
    name: string;            // 模型名
    version: string;         // 版本（如 v1.2）
    org: string;             // 提供方 / 组织

    kind?: "text" | "image" | "video" | "audio" | "multimodal"; // 模型类型（用于卡片悬停交互）
    previewVideoUrl?: string;       // 视频模型的预览 URL
    oneLiner: string;        // 一句话价值（约 28 全角）
    oneLiner_en?: string;    // oneLiner 的英文版
    summary: string;         // 简短说明（1〜2 行）
    summary_en?: string;     // summary 的英文版
    tags: string[];          // 标签（任务 / 功能 / 系列）
    tags_en?: string[];      // tags 的英文版
    status?: StatusFlag[];   // 状态徽章（最多 2 个）
    coverUrl?: string;       // 16:9 封面
    // 表格对齐字段（来自客户提供的表格：标签1..标签8）
    category?: string;       // 标签1：模型类型（Text-to-Image / Text-to-Image 等）
    orgLogo?: string;        // 标签2：组织 logo（public/logos/...）
    release?: string;        // 标签5：上架时间或状态（如 "近日公開予定"）
    release_en?: string;     // release 的英文版
    extra?: string;          // 标签6：补充信息（可选）
    capabilityDetail?: string; // 标签7：能力/模型规模（例：画像生成/20b）
    capabilityDetail_en?: string; // capabilityDetail 的英文版
    secondaryLabel?: string;   // 额外标签（例如：Image-to-Image）
    pricingNote?: string;    // 标签8：价格备注（例如：料金は順次公開予定）
    pricingNote_en?: string; // pricingNote 的英文版
    pricing: {
        unit: PricingUnit;
        valueJpy: number;      // 金額（JPY）
        taxIncluded: boolean;  // 税込 / 税抜
    };
    links?: {
        try?: string;
        console?: string;
        docs?: string;
    };
    capabilities?: {
        inputs?: string[];
        outputs?: string[];
        limits?: Record<string, string | number | boolean>;
    };
    latency?: { p50?: number; p95?: number }; // 毫秒
    popularity?: number;              // 热度评分（越高越受欢迎）
    examples?: Array<{ in: string; out: string }>; // 使用示例
    changelog?: Array<{ date: string; version: string; diff: string }>; // 版本更新记录
}

// ---------------------------------------------
// 示例数据（占位，后续由 API / CSV 替换）
// ---------------------------------------------
// ---------------------------------------------
// 模型详情弹窗（可复用）
// ---------------------------------------------
export function ModelDetailDialog({
    open,
    onOpenChange,
    model,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    model: ModelItem | null;
}) {
    const { lang } = useLanguage();
    if (!model) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-slate-200 shadow-2xl">
                <DialogHeader className="mb-4">
                    <DialogTitle className="flex items-baseline gap-3 text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                        {/* Kind label */}
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200">
                            {model.kind || "Model"}
                        </span>
                        <span>{model.name}</span>
                        <span className="text-base font-medium text-slate-400">
                            {model.version}
                        </span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-slate-500 font-medium">
                        by {model.org} · {lang === "ja" ? model.oneLiner : (model.oneLiner_en || model.oneLiner)}
                    </DialogDescription>
                </DialogHeader>

                <ModelDetail model={model} />

                <ModelDetailFooter model={model} onOpenChange={onOpenChange} />
            </DialogContent>
        </Dialog>
    );
}

// ---------------------------------------------
// 工具方法
// ---------------------------------------------


function classNames(...args: Array<string | false | undefined>) {
    return args.filter(Boolean).join(" ");
}

// ---------------------------------------------
// 弹窗底部（含多语言文案）
// ---------------------------------------------
function ModelDetailFooter({ model, onOpenChange }: { model: ModelItem; onOpenChange: (open: boolean) => void }) {
    const { lang } = useLanguage();
    return (
        <DialogFooter className="mt-8 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-slate-300 text-slate-600 hover:bg-slate-100">
                {lang === "ja" ? "閉じる" : "Close"}
            </Button>
            <div className="flex gap-2">
                {/* Temporarily hidden
                {model.links?.docs && (
                    <Button variant="ghost" asChild className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                        <a href={model.links.docs}>
                            {lang === "ja" ? "ドキュメント" : "Docs"}
                        </a>
                    </Button>
                )}
                */}
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                    <a href={`/playground?model=${model.id}`}>
                        {lang === "ja" ? "プレイグラウンドで試す" : "Try in Playground"}
                    </a>
                    <span className="ml-2">→</span>
                </Button>
            </div>
        </DialogFooter>
    );
}

// ---------------------------------------------
// 标签列表（最多显示 5 个，超出以 +N 表示）
// ---------------------------------------------


// ---------------------------------------------
// 模态框详细区域 - 横向布局（左侧信息，右侧代码示例）
// ---------------------------------------------
function ModelDetail({ model }: { model: ModelItem }) {
    const { lang } = useLanguage();
    const formatUnit = (unit: PricingUnit) => {
        return unit === "per_1k_tokens"
            ? (lang === "ja" ? "1K トークン" : "1K tokens")
            : unit === "per_image"
                ? (lang === "ja" ? "画像 1 枚" : "1 image")
                : (lang === "ja" ? "1 分" : "1 min");
    };

    return (
        <div className="text-gray-900">
            {/* メインコンテンツ: 横版2カラムレイアウト */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 左カラム: モデル情報 */}
                <div className="space-y-4">
                    {/* カバー画像 - 高さを増やし、焦点を調整 */}
                    <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-100">
                        {model.kind === "video" && model.previewVideoUrl ? (
                            <video
                                src={model.previewVideoUrl}
                                className="w-full h-full object-cover bg-black"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <img
                                src={model.coverUrl}
                                alt={`${model.name} の画像`}
                                className="w-full h-full object-cover object-center"
                                style={{ objectPosition: 'center 20%' }}
                                loading="lazy"
                                crossOrigin="anonymous"
                                decoding="async"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).onerror = null;
                                    (e.currentTarget as HTMLImageElement).src =
                                        lang === "ja"
                                            ? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='192'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'>画像なし</text></svg>"
                                            : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='192'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'>No image</text></svg>";
                                }}
                            />
                        )}
                        {/* Kind badge */}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 text-[9px] font-medium text-white uppercase">
                            {model.category || model.kind || "AI"}
                        </span>
                    </div>

                    {/* 概要 */}
                    <p className="text-sm leading-relaxed text-gray-600">
                        {lang === "ja" ? model.summary : (model.summary_en || model.summary)}
                    </p>

                    {/* スペック */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg border border-gray-100 p-3">
                            <div className="text-[10px] text-gray-400 uppercase">{lang === "ja" ? "料金" : "Pricing"}</div>
                            {model.pricingNote ? (
                                <div className="mt-1 text-xs text-slate-700">
                                    {lang === "ja" ? model.pricingNote : (model.pricingNote_en || model.pricingNote)}
                                </div>
                            ) : (
                                <div className="mt-1 text-lg font-semibold text-gray-900">
                                    ¥{model.pricing.valueJpy.toFixed(2)}
                                    <span className="text-xs font-normal text-gray-400">
                                        / {formatUnit(model.pricing.unit)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="rounded-lg border border-gray-100 p-3">
                            <div className="text-[10px] text-gray-400 uppercase">P50</div>
                            <div className="mt-1 text-lg font-semibold text-gray-900">
                                {model.latency?.p50 || "-"}<span className="text-xs font-normal text-gray-400">ms</span>
                            </div>
                        </div>
                    </div>

                    {/* 機能 */}
                    {model.capabilities && (
                        <div className="rounded-lg border border-gray-100 p-3">
                            <div className="text-[10px] text-gray-400 uppercase mb-2">{lang === "ja" ? "機能" : "Capabilities"}</div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                {model.capabilities.inputs && (
                                    <div>{lang === "ja" ? "入力" : "Input"}: <span className="text-gray-900">{model.capabilities.inputs.join(", ")}</span></div>
                                )}
                                {model.capabilities.outputs && (
                                    <div>{lang === "ja" ? "出力" : "Output"}: <span className="text-gray-900">{model.capabilities.outputs.join(", ")}</span></div>
                                )}
                                {model.capabilities.limits && Object.entries(model.capabilities.limits).slice(0, 2).map(([k, v]) => (
                                    <div key={k}>{k}: <span className="text-gray-900">{String(v)}</span></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* タグ */}
                    <div className="flex flex-wrap gap-1">
                        {(lang === "ja" ? model.tags : (model.tags_en || model.tags)).slice(0, 4).map((t) => (
                            <span key={t} className="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">{t}</span>
                        ))}
                        {(lang === "ja" ? model.tags : (model.tags_en || model.tags)).length > 4 &&
                            <span className="text-[10px] text-gray-400">+{(lang === "ja" ? model.tags : (model.tags_en || model.tags)).length - 4}</span>
                        }
                    </div>
                </div>

                {/* 右カラム: コード例 */}
                <div className="flex flex-col h-full">
                    <div className="flex-1 rounded-xl border border-gray-200 bg-slate-900 overflow-hidden flex flex-col">
                        {/* コードヘッダー */}
                        <div className="px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-slate-400 ml-2">API Example</span>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText(`curl -X POST https://api.stratoflow.jp/v1/${model.id}/generate -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"prompt": "...", "max_tokens": 1000}'`)}
                                className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                {lang === "ja" ? "コピー" : "Copy"}
                            </button>
                        </div>

                        {/* コードコンテンツ */}
                        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed">
                            <div className="text-slate-300">
                                <span className="text-emerald-400">curl</span> -X POST \
                            </div>
                            <div className="text-amber-300 pl-4">
                                https://api.stratoflow.jp/v1/{model.id}/generate \
                            </div>
                            <div className="text-slate-300 pl-4">
                                -H <span className="text-amber-300">"Authorization: Bearer YOUR_API_KEY"</span> \
                            </div>
                            <div className="text-slate-300 pl-4">
                                -H <span className="text-amber-300">"Content-Type: application/json"</span> \
                            </div>
                            <div className="text-slate-300 pl-4">
                                -d <span className="text-amber-300">'&#123;"prompt": "...", "max_tokens": 1000&#125;'</span>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-700">
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Response</div>
                                <div className="text-slate-300">
                                    <span className="text-slate-500">&#123;</span><br />
                                    <span className="pl-4"><span className="text-blue-400">"id"</span>: <span className="text-amber-300">"{model.id}-xxx"</span>,</span><br />
                                    <span className="pl-4"><span className="text-blue-400">"model"</span>: <span className="text-amber-300">"{model.id}"</span>,</span><br />
                                    <span className="pl-4"><span className="text-blue-400">"output"</span>: <span className="text-amber-300">"..."</span>,</span><br />
                                    <span className="pl-4"><span className="text-blue-400">"usage"</span>: &#123;"tokens": 123&#125;</span><br />
                                    <span className="text-slate-500">&#125;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------
// 单卡片组件
// ---------------------------------------------
function ModelCard({
    model,
    onOpen,
    isPicked,
    onTogglePick,
    index,
}: {
    model: ModelItem;
    onOpen: (m: ModelItem) => void;
    isPicked: boolean;
    onTogglePick: () => void;
    index: number;
}) {
    const { lang } = useLanguage();
    const onKey: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(model);
        }
    };

    const isVideo = model.kind === "video";
    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    const handleHoverEnter = () => {
        if (isVideo && model.previewVideoUrl && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleHoverLeave = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onOpen(model)}
            onKeyDown={onKey}
            style={{
                animationDelay: `${index * 80}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            className={classNames(
                "group relative break-inside-avoid select-none",
                "rounded-2xl overflow-hidden bg-[#F2F2F2]",
                "transition-transform duration-300 active:scale-[0.98]",
                "focus:outline-none focus:ring-1 focus:ring-inset focus:ring-slate-400",
                "animate-sf-fade-up",
                "print:shadow-none print:bg-white"
            )}
        >
            {/* Image background - fills top portion */}
            <div
                className="absolute inset-x-0 top-0 rounded-t-2xl overflow-hidden"
                style={{ bottom: "40%" }}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
            >
                {isVideo && model.previewVideoUrl ? (
                    <video
                        ref={videoRef}
                        className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        muted
                        playsInline
                        loop
                    >
                        <source src={model.previewVideoUrl} type="video/mp4" />
                    </video>
                ) : model.coverUrl ? (
                    <img
                        src={model.coverUrl}
                        alt={model.name}
                        className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                        loading="lazy"
                        decoding="async"
                        crossOrigin="anonymous"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).onerror = null;
                            (e.currentTarget as HTMLImageElement).src =
                                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='%23f8fafc'/></svg>";
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                        <span className="text-xs uppercase tracking-widest font-medium">{lang === "ja" ? "プレビューなし" : "No preview"}</span>
                    </div>
                )}
            </div>

            {/* Spacer for image area */}
            <div className="relative aspect-[2/1] pointer-events-none">
                {/* Category Badge - show category (标签1) if present, else kind */}
                {/* Category Badge - show category (标签1) if present, else kind */}
                <div className="absolute top-3 left-3 z-20 pointer-events-auto flex flex-row gap-1 items-start">
                    <div className="px-2 py-0.5 rounded-full bg-black/10 backdrop-blur-md border border-white/20 text-[9px] font-bold text-white uppercase tracking-tighter">
                        {(() => {
                            const label = model.category || model.kind || (lang === "ja" ? "AIモデル" : "AI Model");
                            if (label.toLowerCase() === "text" || label.toLowerCase() === "image") {
                                return <ArrowLeftRight className="w-3 h-3" />;
                            }
                            return label;
                        })()}
                    </div>
                    {model.secondaryLabel && (
                        <div className="px-2 py-0.5 rounded-full bg-black/10 backdrop-blur-md border border-white/20 text-[9px] font-bold text-white uppercase tracking-tighter">
                            {model.secondaryLabel}
                        </div>
                    )}
                </div>

                {/* Compare Checkbox */}
                <div
                    className="absolute top-3 right-3 z-20 pointer-events-auto"
                    onClick={(e) => {
                        e.stopPropagation();
                        onTogglePick();
                    }}
                >
                    <div className={classNames(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300",
                        isPicked
                            ? "bg-blue-600 border-blue-600 scale-110 shadow-[0_0_15px_rgba(37,99,235,0.4)] animate-sf-pop"
                            : "bg-white/20 border-white/40 backdrop-blur-md hover:border-white/60 hover:scale-105 active:scale-90"
                    )}>
                        {isPicked && (
                            <svg
                                className="w-3 h-3 text-white animate-in zoom-in-50 duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Area - Liquid Glass Effect with overlap */}
            <div
                className="relative z-10 -mt-4 p-4 rounded-xl mx-0 print:bg-white print:backdrop-blur-none print:border-slate-200"
                style={{
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.08)",
                }}
            >
                <div className="space-y-3">
                    <div className="space-y-0.5">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {model.orgLogo ? (
                                    <img src={model.orgLogo} alt={model.org} className="w-8 h-8 rounded-md object-contain bg-white/60 p-1 border border-slate-100" />
                                ) : null}
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-tight">
                                        {model.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="text-[9px] font-medium text-slate-400">by</span>
                                        <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-wider">{model.org}</span>
                                    </div>
                                </div>
                            </div>

                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 shrink-0">
                                {lang === "ja" ? (model.release || model.version) : (model.release_en || model.release || model.version)}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs leading-snug text-slate-600 line-clamp-2 min-h-[2rem]">
                            {lang === "ja" ? model.oneLiner : (model.oneLiner_en || model.oneLiner)}
                        </p>

                        {/* 预留一行高度，避免删除能力文案后卡片变矮 */}
                        <div className="mt-1 h-[18px]" aria-hidden="true" />

                        {/* Subtle Tags */}
                        <div className="flex flex-wrap gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            {(lang === "ja" ? model.tags : (model.tags_en || model.tags)).slice(0, 2).map((tag) => (
                                <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded bg-white/60 text-slate-500 border border-slate-200/60 font-medium whitespace-nowrap">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/40">
                        <div className="flex flex-col">
                            {model.pricingNote ? (
                                <div className="mt-1 text-xs text-slate-700">
                                    {lang === "ja" ? model.pricingNote : (model.pricingNote_en || model.pricingNote)}
                                </div>
                            ) : (
                                <p className="text-sm font-bold text-slate-900 leading-tight">
                                    ¥{model.pricing.valueJpy.toFixed(2)}
                                    <span className="text-[9px] font-normal text-slate-500 ml-0.5">
                                        / {model.pricing.unit === "per_1k_tokens" ? "1K tok" : model.pricing.unit === "per_image" ? "img" : "min"}
                                    </span>
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-0.5 text-[9px] font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                            <span>{lang === "ja" ? "詳細" : "Details"}</span>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// ---------------------------------------------
// 列表页主体（网格 + 模态）
// ---------------------------------------------
export type SortByType =
    | "デフォルト"
    | "人気順"
    | "価格の安い順"
    | "価格の高い順"
    | "レイテンシP50";

export default function ModelGallery({
    data = CAROUSEL_MODELS,
    forceTheme,
    filterInHero = false,
    // 外部传入的筛选状态（当 filterInHero 为 true 时使用）
    externalQ,
    externalSetQ,
    externalTagFilter,
    externalSetTagFilter,
    externalOrgFilter,
    externalSetOrgFilter,
    externalSortBy,
    externalSetSortBy,
}: {
    data?: ModelItem[];
    forceTheme?: "light" | "dark";
    filterInHero?: boolean;
    externalQ?: string;
    externalSetQ?: (v: string) => void;
    externalTagFilter?: string;
    externalSetTagFilter?: (v: string) => void;
    externalOrgFilter?: string;
    externalSetOrgFilter?: (v: string) => void;
    externalSortBy?: SortByType;
    externalSetSortBy?: (v: SortByType) => void;
}) {
    const { lang } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState<ModelItem | null>(null);

    const [picked, setPicked] = useState<string[]>([]);
    const [compareOpen, setCompareOpen] = useState(false);

    // —— フィルタ / ソート / テーマ —— //
    // 若外部未提供，则使用内部状态
    const [internalQ, internalSetQ] = useState("");
    const [internalTagFilter, internalSetTagFilter] = useState<string>("すべて");
    const [internalOrgFilter, internalSetOrgFilter] = useState<string>("すべて");
    const [internalSortBy, internalSetSortBy] = useState<SortByType>("デフォルト");

    // 通过 URL 参数打开弹窗
    useEffect(() => {
        const openModelId = searchParams.get("openModel");
        if (openModelId) {
            const model = CAROUSEL_MODELS.find(m => m.id === openModelId);
            if (model) {
                setCurrent(model);
                setOpen(true);
                // 关闭后清理 URL 参数
                setSearchParams({}, { replace: true });
            }
        }
    }, [searchParams, setSearchParams]);

    // 根据是否外部传入决定使用哪套状态
    const q = filterInHero && externalQ !== undefined ? externalQ : internalQ;
    const setQ = filterInHero && externalSetQ ? externalSetQ : internalSetQ;
    const tagFilter = filterInHero && externalTagFilter !== undefined ? externalTagFilter : internalTagFilter;
    const setTagFilter = filterInHero && externalSetTagFilter ? externalSetTagFilter : internalSetTagFilter;
    const orgFilter = filterInHero && externalOrgFilter !== undefined ? externalOrgFilter : internalOrgFilter;
    const setOrgFilter = filterInHero && externalSetOrgFilter ? externalSetOrgFilter : internalSetOrgFilter;
    const sortBy = filterInHero && externalSortBy !== undefined ? externalSortBy : internalSortBy;
    const setSortBy = filterInHero && externalSetSortBy ? externalSetSortBy : internalSetSortBy;
    // 已移除暗色模式——本站未使用

    function togglePick(id: string) {
        setPicked((prev) => {
            const has = prev.includes(id);
            const next = has ? prev.filter((x) => x !== id) : [...prev, id];
            return next.slice(0, 3); // 最多返回 3 条
        });
    }

    const pickedModels = useMemo(
        () => data.filter((d) => picked.includes(d.id)).slice(0, 3),
        [data, picked]
    );


    const allTags = useMemo(
        () => Array.from(new Set(data.flatMap((d) => d.tags))),
        [data]
    );
    const allOrgs = useMemo(
        () => Array.from(new Set(data.map((d) => d.org))),
        [data]
    );

    const filtered = useMemo(() => {
        const kw = q.trim().toLowerCase();
        let list = data.filter((d) => {
            const hit = (s: string) => s.toLowerCase().includes(kw);
            const byKw =
                !kw ||
                hit(d.name) ||
                hit(d.org) ||
                hit(d.summary) ||
                d.tags.some((t) => hit(t));
            const byTag = tagFilter === "すべて" || d.tags.includes(tagFilter);
            const byOrg = orgFilter === "すべて" || d.org === orgFilter;
            return byKw && byTag && byOrg;
        });

        switch (sortBy) {
            case "人気順":
                list = [...list].sort(
                    (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
                );
                break;
            case "価格の安い順":
                list = [...list].sort(
                    (a, b) =>
                        (a.pricing?.valueJpy ?? 0) -
                        (b.pricing?.valueJpy ?? 0)
                );
                break;
            case "価格の高い順":
                list = [...list].sort(
                    (a, b) =>
                        (b.pricing?.valueJpy ?? 0) -
                        (a.pricing?.valueJpy ?? 0)
                );
                break;
            case "レイテンシP50":
                list = [...list].sort(
                    (a, b) =>
                        (a.latency?.p50 ?? Number.POSITIVE_INFINITY) -
                        (b.latency?.p50 ?? Number.POSITIVE_INFINITY)
                );
                break;
            default:
                // 默认按名称排序
                list = [...list].sort((a, b) =>
                    a.name.localeCompare(b.name, "ja-JP")
                );
        }
        return list;
    }, [data, q, tagFilter, orgFilter, sortBy]);

    function openModal(m: ModelItem) {
        setCurrent(m);
        setOpen(true);
    }

    return (
        <div
            data-variant="v2"
            data-theme={forceTheme ?? "light"}
            className="theme-scope min-h-screen bg-[#F2F2F2] text-slate-900"
        >


            {/* フィルタバー - Only show when not in hero */}
            {!filterInHero && (
                <div className="mx-auto max-w-[1400px] px-4 py-6 no-print md:px-6 lg:px-8">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg p-5">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {/* 検索 */}
                            <div className="lg:col-span-1">
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder={lang === "ja" ? "モデル / 組織 / タグで検索…" : "Search models, orgs, tags..."}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10 placeholder:text-slate-400"
                                />
                            </div>
                            {/* タグで絞り込み */}
                            <div>
                                <select
                                    value={tagFilter}
                                    onChange={(e) => setTagFilter(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-slate-300 transition-all duration-300 cursor-pointer"
                                    aria-label={lang === "ja" ? "タグで絞り込み" : "Filter by tag"}
                                >
                                    <option value="すべて">{lang === "ja" ? "すべてのタグ" : "All tags"}</option>
                                    {allTags.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* 提供元で絞り込み */}
                            <div>
                                <select
                                    value={orgFilter}
                                    onChange={(e) => setOrgFilter(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-slate-300 transition-all duration-300 cursor-pointer"
                                    aria-label={lang === "ja" ? "提供元で絞り込み" : "Filter by provider"}
                                >
                                    <option value="すべて">{lang === "ja" ? "すべての提供元" : "All providers"}</option>
                                    {allOrgs.map((o) => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* 並び替え */}
                            <div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortByType)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-slate-300 transition-all duration-300 cursor-pointer"
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
                        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                            <span className="text-xs text-slate-500">
                                {lang === "ja" ? `全 ${filtered.length} 件のモデル` : `${filtered.length} models`}
                            </span>
                            <button
                                onClick={() => {
                                    setQ("");
                                    setTagFilter("すべて");
                                    setOrgFilter("すべて");
                                    setSortBy("デフォルト");
                                }}
                                className="text-[10px] font-bold text-slate-400 hover:text-blue-600 tracking-widest transition-all active:scale-95 px-2 py-1 rounded-md hover:bg-blue-50"
                            >
                                {lang === "ja" ? "条件をリセット" : "Reset filters"}
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* Model Grid - Focus on whitespace */}
            <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-32 md:px-10 lg:px-12">
                {(() => {
                    const sections = lang === "ja" ? [
                        { key: 'image', label: '画像生成モデル', color: 'bg-blue-400' },
                        { key: 'video', label: '動画生成モデル', color: 'bg-yellow-400' },
                        { key: 'text', label: 'テキスト生成 / LLM', color: 'bg-amber-400' },
                        { key: 'audio', label: '音声生成モデル', color: 'bg-purple-400' },
                        { key: 'multimodal', label: 'マルチモーダル', color: 'bg-indigo-400' },
                        { key: 'other', label: 'その他', color: 'bg-slate-400' }
                    ] : [
                        { key: 'image', label: 'Image Generation', color: 'bg-blue-400' },
                        { key: 'video', label: 'Video Generation', color: 'bg-yellow-400' },
                        { key: 'text', label: 'Text Generation / LLM', color: 'bg-amber-400' },
                        { key: 'audio', label: 'Audio Generation', color: 'bg-purple-400' },
                        { key: 'multimodal', label: 'Multimodal', color: 'bg-indigo-400' },
                        { key: 'other', label: 'Other', color: 'bg-slate-400' }
                    ];

                    // 对列表进行分组
                    const grouped = filtered.reduce((acc, item) => {
                        const k = item.kind || 'other';
                        if (!acc[k]) acc[k] = [];
                        acc[k].push(item);
                        return acc;
                    }, {} as Record<string, ModelItem[]>);

                    const hasItems = Object.keys(grouped).length > 0;

                    if (!hasItems) {
                        return (
                            <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-3xl border border-slate-100 border-dashed">
                                <div className="text-4xl mb-4 opacity-50">🔍</div>
                                <p className="text-lg font-medium">{lang === "ja" ? "条件に一致するモデルは見つかりませんでした" : "No models found matching your criteria"}</p>
                                <p className="text-sm mt-2 opacity-70">{lang === "ja" ? "検索条件を変更して再度お試しください" : "Try adjusting your search filters"}</p>
                            </div>
                        );
                    }

                    return (
                        <div className="space-y-20">
                            {sections.map(section => {
                                const items = grouped[section.key] || [];
                                if (items.length === 0) return null;

                                return (
                                    <div key={section.key} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="flex items-center gap-3 mb-8 pl-1">
                                            <span className={`w-3 h-3 rounded-full ${section.color} opacity-80`}></span>
                                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                                                {section.label}
                                            </h2>
                                            <div className="h-px bg-slate-200 flex-1 ml-4 opacity-70"></div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {items.map((m, idx) => (
                                                <ModelCard
                                                    key={m.id}
                                                    model={m}
                                                    onOpen={openModal}
                                                    isPicked={picked.includes(m.id)}
                                                    onTogglePick={() => togglePick(m.id)}
                                                    index={idx}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })()}
            </div>

            {/* Compare Bar (Floating) */}
            {picked.length > 0 && (
                <div className="no-print fixed bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] px-6 py-3.5 flex items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{lang === "ja" ? "比較中" : "Comparing"}</span>
                        <div className="flex items-baseline gap-1.5 overflow-hidden">
                            <span key={picked.length} className="text-xl font-bold text-slate-900 leading-none animate-sf-pop inline-block">{picked.length}</span>
                            <span className="text-xs font-bold text-slate-300">/ 3</span>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-100" />
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white h-10 font-bold tracking-tight rounded-2xl px-6 shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-300"
                            onClick={() => setCompareOpen(true)}
                            disabled={picked.length < 2}
                        >
                            {lang === "ja" ? "すべて比較" : "Compare"}
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-slate-400 hover:text-slate-600 font-bold text-[10px] tracking-widest px-4 active:scale-95 transition-all duration-300"
                            onClick={() => setPicked([])}
                        >
                            {lang === "ja" ? "クリア" : "Clear"}
                        </Button>
                    </div>
                </div>
            )}

            {/* Detailed Modal - Wide Horizontal Layout */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[95vw] max-w-[1200px] h-[80vh] max-h-[800px] overflow-hidden bg-transparent border-none p-0 shadow-none">
                    {current && (
                        <div className="relative bg-white text-slate-900 rounded-3xl shadow-2xl flex flex-col h-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            {/* Header */}
                            <div className="flex-shrink-0 px-8 md:px-10 pt-8 pb-4 border-b border-slate-100">
                                <DialogHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                            {current.kind || (lang === "ja" ? "モデル詳細" : "Model Details")}
                                        </span>
                                        <span className="text-xs font-medium text-slate-300">
                                            {current.version}
                                        </span>
                                    </div>
                                    <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                        {current.name}
                                    </DialogTitle>
                                    <DialogDescription className="text-slate-500 text-base mt-1">
                                        by {current.org} · {lang === "ja" ? current.oneLiner : (current.oneLiner_en || current.oneLiner)}
                                    </DialogDescription>
                                </DialogHeader>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-8 md:px-10 py-6">
                                <ModelDetail model={current} />
                            </div>

                            {/* Sticky Footer Buttons */}
                            <div className="flex-shrink-0 px-8 md:px-10 py-4 border-t border-slate-100 bg-white">
                                <div className="flex items-center justify-between">
                                    {/* 左側: セカンダリアクション */}
                                    <div className="flex items-center gap-2">
                                        {/* Temporarily hidden
                                        {current.links?.docs && (
                                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700" asChild>
                                                <a href={current.links.docs} className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    {lang === "ja" ? "ドキュメント" : "Docs"}
                                                </a>
                                            </Button>
                                        )}
                                        */}
                                        {current.links?.console && (
                                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700" asChild>
                                                <a href={current.links.console} className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {lang === "ja" ? "コンソール" : "Console"}
                                                </a>
                                            </Button>
                                        )}
                                    </div>

                                    {/* 右側: プライマリアクション */}
                                    <div className="flex items-center gap-3">
                                        <DialogClose asChild>
                                            <Button variant="ghost" className="text-slate-400 hover:text-slate-600 font-medium">
                                                {lang === "ja" ? "閉じる" : "Close"}
                                            </Button>
                                        </DialogClose>
                                        {current.links?.try && (
                                            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-11 px-8 font-bold tracking-tight shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5" asChild>
                                                <a href={current.links.try} className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                    </svg>
                                                    {lang === "ja" ? "API を利用する" : "Use API"}
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Comparison Modal */}
            <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-transparent border-none p-0 shadow-none">
                    <div className="bg-white text-slate-900 sm:rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-8 md:p-12">
                            <DialogHeader className="mb-8">
                                <DialogTitle className="text-3xl font-bold text-slate-900 tracking-tight">{lang === "ja" ? "モデル比較" : "Model Comparison"}</DialogTitle>
                                <DialogDescription className="text-slate-500">
                                    {lang === "ja" ? "最大3件のモデルを並べて比較します。" : "Compare up to 3 models side by side."}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="overflow-x-auto border rounded-2xl border-slate-100">
                                <table className="w-full text-sm text-slate-800">
                                    <thead className="text-left bg-slate-50/50">
                                        <tr>
                                            <th className="py-4 px-6 font-bold text-[10px] text-slate-400 uppercase tracking-widest">{lang === "ja" ? "項目" : "Field"}</th>
                                            {pickedModels.map((m) => (
                                                <th key={m.id} className="py-4 px-6">
                                                    <div className="font-bold text-slate-900 text-base">{m.name}</div>
                                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{m.version}</div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        <tr className="animate-sf-slide-up-fade" style={{ "--delay": "100ms" } as React.CSSProperties}>
                                            <td className="py-4 px-6 font-medium text-slate-500 bg-slate-50/20">{lang === "ja" ? "提供元" : "Provider"}</td>
                                            {pickedModels.map((m) => (
                                                <td key={m.id + "org"} className="py-4 px-6 font-semibold">{m.org}</td>
                                            ))}
                                        </tr>
                                        <tr className="animate-sf-slide-up-fade" style={{ "--delay": "150ms" } as React.CSSProperties}>
                                            <td className="py-4 px-6 font-medium text-slate-500 bg-slate-50/20">{lang === "ja" ? "特徴" : "Features"}</td>
                                            {pickedModels.map((m) => (
                                                <td key={m.id + "ol"} className="py-4 px-6 leading-relaxed">{m.oneLiner}</td>
                                            ))}
                                        </tr>
                                        <tr className="animate-sf-slide-up-fade" style={{ "--delay": "200ms" } as React.CSSProperties}>
                                            <td className="py-4 px-6 font-medium text-slate-500 bg-slate-50/20">{lang === "ja" ? "料金" : "Pricing"}</td>
                                            {pickedModels.map((m) => (
                                                <td key={m.id + "pr"} className="py-4 px-6">
                                                    <div className="font-bold text-slate-900 text-lg">¥{m.pricing.valueJpy.toFixed(2)}</div>
                                                    <div className="text-[10px] text-slate-400 uppercase tracking-tight">{m.pricing.unit}</div>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="animate-sf-slide-up-fade" style={{ "--delay": "250ms" } as React.CSSProperties}>
                                            <td className="py-4 px-6 font-medium text-slate-500 bg-slate-50/20">{lang === "ja" ? "レイテンシ (P50)" : "Latency (P50)"}</td>
                                            {pickedModels.map((m) => (
                                                <td key={m.id + "lat"} className="py-4 px-6 font-bold text-slate-700">
                                                    {m.latency ? `${m.latency.p50}ms` : "-"}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="animate-sf-slide-up-fade" style={{ "--delay": "300ms" } as React.CSSProperties}>
                                            <td className="py-4 px-6 font-medium text-slate-500 bg-slate-50/20">{lang === "ja" ? "入出力" : "I/O"}</td>
                                            {pickedModels.map((m) => (
                                                <td key={m.id + "io"} className="py-4 px-6">
                                                    <div className="flex flex-wrap gap-1">
                                                        {(m.capabilities?.inputs || []).concat(m.capabilities?.outputs || []).map((cap, i) => (
                                                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 font-bold uppercase">{cap}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <DialogFooter className="mt-8 pt-8 border-t border-slate-50">
                                <DialogClose asChild>
                                    <Button variant="ghost" className="text-slate-400 hover:text-slate-600 font-bold tracking-widest text-[10px]">{lang === "ja" ? "閉じる" : "Close"}</Button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* テーマ上書き + 印刷スタイル（A4） */}
            <style>{`
        @page { size: A4; margin: 18mm 16mm; }
        @media print {
          .no-print { display: none !important; }
          .break-inside-avoid { break-inside: avoid; }
          a:link::after { content: " (" attr(href) ")"; font-size: 10px; color: #555; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
        </div >
    );
}
