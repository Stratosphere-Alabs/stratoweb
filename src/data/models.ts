// 共享的 API/模型数据
// 用于首页旋转画廊和模型页面

import type { ModelItem } from "@/components/ModelGallery";
import { getAssetUrl } from "@/utils/assets";

// 旋转画廊用的简化数据结构
export type ApiCard = {
    id: string;
    imageUrl: string;
    videoUrl?: string; // 可选：用于 3D 轮播的视频地址
    label: string;
    title: string;
    description: string;
    description_en?: string; // description 的英文版
    gradientClass: string;
    secondaryLabel?: string;
    source?: string;
};

// 首页旋转画廊数据（共 7 条）
export const carouselCards: ApiCard[] = [
    {
        id: "viduq-2-pro",
        imageUrl: getAssetUrl("Viduq2-pro.png"),
        label: "VIDEO",
        title: "Viduq2-pro",
        description: "静止イメージを映画的な映像表現へ。高い一貫性と臨場感を備えた1080p動画生成に対応。",
        description_en: "Transform still images into cinematic video. Supports 1080p video generation with high consistency and immersion.",
        gradientClass: "bg-gradient-to-r from-slate-900 via-emerald-500 to-amber-400",
        secondaryLabel: "Text-to-Video",
        source: "by Vidu",
    },
    {
        id: "minimax-hailuo-02",
        imageUrl: getAssetUrl("Minimax-Hailuo-2.3.png"),
        label: "VIDEO",
        title: "Minimax-Hailuo-02",
        description: "カメラ指示や動きを制御可能な動画生成モデル。滑らかな人体表現と映画品質の映像表現が特長。",
        description_en: "Video generation model with camera and motion control. Features smooth human rendering and cinema-quality visuals.",
        gradientClass: "bg-gradient-to-r from-slate-900 via-sky-500 to-cyan-300",
        secondaryLabel: "Text-to-Video/Image-to-Video",
        source: "by Minimax",
    },
    {
        id: "wan-2-2",
        imageUrl: getAssetUrl("Wan2.2-T2V-A14B.png"),
        label: "VIDEO",
        title: "Wan2.2-T2V-A14B",
        description: "MoEアーキテクチャを採用し、高品質な5秒動画（480p / 720p）生成に対応。",
        description_en: "MoE architecture enabling high-quality 5-second video generation (480p/720p).",
        gradientClass: "bg-gradient-to-r from-slate-900 via-blue-600 to-sky-400",
        secondaryLabel: "Text-to-Video",
        source: "by Qwen",
    },
    {
        id: "seedance-1-0",
        imageUrl: getAssetUrl("Seedream-4-0-250828.png"),
        label: "VIDEO",
        title: "Seedance-1-0",
        description: "Seedanceのスタンダードモデル。安定した動画生成能力と幅広いスタイルへの適応性。",
        description_en: "Seedance standard model. Stable video generation with wide style adaptability.",
        gradientClass: "bg-gradient-to-r from-slate-900 via-teal-700 to-green-500",
        secondaryLabel: "Text-to-Video",
        source: "by ByteDance Seed",
    },
    {
        id: "qwen-image",
        imageUrl: getAssetUrl("Qwen-Image.png"),
        label: "IMAGES",
        title: "Qwen-Image",
        description: "テキスト描画に強みを持つ高精度画像生成モデル。複雑なレイアウトと自然な表現を両立。",
        description_en: "High-precision image model excelling at text rendering. Balances complex layouts with natural expression.",
        gradientClass: "bg-gradient-to-r from-slate-900 via-violet-500 to-amber-400",
        source: "by Qwen",
    },
    {
        id: "z-image-turbo",
        imageUrl: getAssetUrl("zimageturbo.png"),
        label: "IMAGES",
        title: "Z-Image-Turbo",
        description: "軽量かつ高速な画像生成モデル。中英テキスト描画の正確さと高い指示追従性を実現。",
        description_en: "Lightweight, fast image model. Accurate Chinese/English text rendering with high prompt adherence.",
        gradientClass: "bg-gradient-to-r from-slate-900 via-orange-500 to-rose-400",
        source: "by Tongyi-MAI",
    },
    {
        id: "flux2-flex",
        imageUrl: getAssetUrl("FLUX.2-flex.png"),
        label: "IMAGES",
        title: "FLUX.2-flex",
        description: "高精度なテキスト描画と柔軟なパラメータ調整に対応した、プロダクション向け画像生成・編集モデル。",
        description_en: "Production-ready image generation and editing model with precise text rendering and flexible parameters.",
        gradientClass: "bg-gradient-to-r from-slate-900 via-sky-600 to-cyan-400",
        secondaryLabel: "Image-to-Image",
        source: "by Black Forest Labs",
    },
];

// 模型页面用的完整数据
export const apiCards: ApiCard[] = [
    // 视频模型
    {
        id: "viduq-2-pro",
        imageUrl: getAssetUrl("Viduq2-pro.png"),
        videoUrl: getAssetUrl("video/vidu2pro.mp4"),
        label: "VIDEO",
        title: "Viduq2-pro",
        description: "静止イメージを映画的な映像表現へ。高い一貫性と臨場感を備えた1080p動画生成に対応。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-emerald-500 to-amber-400",

        source: "by Vidu",
    },
    {
        id: "minimax-hailuo-02",
        imageUrl: getAssetUrl("Minimax-Hailuo-2.3.png"),
        videoUrl: getAssetUrl("video/jimeng-2026-01-24-6394.mp4"),
        label: "VIDEO",
        title: "Minimax-Hailuo-02",
        description: "カメラ指示や動きを制御可能な動画生成モデル。滑らかな人体表現と映画品質の映像表現が特長。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-sky-500 to-cyan-300",

        secondaryLabel: "Image-to-Video",
        source: "by Minimax",
    },
    {
        id: "wan-2-2",
        imageUrl: getAssetUrl("Wan2.2-T2V-A14B.png"),
        videoUrl: getAssetUrl("video/Wan2.2-T2V-A14B.mp4"),
        label: "VIDEO",
        title: "Wan2.2-T2V-A14B",
        description: "MoEアーキテクチャを採用し、高品質な5秒動画（480p / 720p）生成に対応。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-blue-600 to-sky-400",

        source: "by Qwen",
    },
    {
        id: "seedance-1-0",
        imageUrl: getAssetUrl("Seedream-4-0-250828.png"),
        videoUrl: getAssetUrl("video/Seedance-1-0.mp4"),
        label: "VIDEO",
        title: "Seedance-1-0",
        description: "Seedanceのスタンダードモデル。安定した動画生成能力と幅広いスタイルへの適応性。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-teal-700 to-green-500",
        source: "by ByteDance Seed",
    },
    {
        id: "seedance-1-5-pro",
        imageUrl: getAssetUrl("Seedream-4-0-250828.png"),
        videoUrl: getAssetUrl("video/Seedance-1-5.mp4"),
        label: "VIDEO",
        title: "Seedance-1-5-pro",
        description: "Seedanceのプロフェッショナル版。より複雑な動きと長時間の動画生成を実現。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-teal-600 to-green-400",
        secondaryLabel: "Image-to-Video",
        source: "by ByteDance Seed",
    },
    {
        id: "kling-v2-6",
        imageUrl: getAssetUrl("Viduq2-pro.png"),
        videoUrl: getAssetUrl("video/Kling-V2-6.mp4"),
        label: "VIDEO",
        title: "Kling-V2-6",
        description: "Kling AIによる次世代動画生成。物理シミュレーションと高精細なレンダリング能力。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-violet-600 to-purple-400",
        secondaryLabel: "Image-to-Video",
        source: "by Kling AI",
    },

    // 图片模型
    {
        id: "qwen-image",
        imageUrl: getAssetUrl("Qwen-Image.png"),
        label: "IMAGES",
        title: "Qwen-Image",
        description: "テキスト描画に強みを持つ高精度画像生成モデル。複雑なレイアウトと自然な表現を両立。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-violet-500 to-amber-400",
    },
    {
        id: "z-image-turbo",
        imageUrl: getAssetUrl("zimageturbo.png"),
        label: "IMAGES",
        title: "Z-Image-Turbo",
        description: "軽量かつ高速な画像生成モデル。中英テキスト描画の正確さと高い指示追従性を実現。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-orange-500 to-rose-400",
    },
    {
        id: "flux2-flex",
        imageUrl: getAssetUrl("FLUX.2-flex.png"),
        label: "IMAGES",
        title: "FLUX.2-flex",
        description: "高精度なテキスト描画と柔軟なパラメータ調整に対応した、プロダクション向け画像生成・編集モデル。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-sky-600 to-cyan-400",
        secondaryLabel: "Image-to-Image",
    },
    {
        id: "seedream-4-0",
        imageUrl: getAssetUrl("Seedream-4-0-250828.png"),
        label: "IMAGES",
        title: "Seedream-4-0-250828",
        description: "テキスト・単一画像・複数画像入力に対応し、一貫したスタイルと構図制御が可能な画像生成モデル。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-emerald-500 to-teal-300",
        secondaryLabel: "Image-to-Image",
    },
    {
        id: "seedream-4-5",
        imageUrl: getAssetUrl("seedream4.5.png"),
        label: "IMAGES",
        title: "Seedream-4-5",
        description: "Seedream の派生モデル。画像生成と編集に強い能力を持つ最新バージョン。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-emerald-500 to-teal-200",
        secondaryLabel: "Image-to-Image",
    },
    {
        id: "nano-banana-pro",
        imageUrl: getAssetUrl("nanobanana.png"),
        label: "IMAGES",
        title: "Nano Banana Pro",
        description: "高効率な小型モデルで、高速な画像生成に最適化されています。",
        gradientClass: "bg-gradient-to-r from-slate-900 via-indigo-500 to-cyan-300",
        secondaryLabel: "Image-to-Image",
    },
];

// 将 ApiCard 转换为 ModelItem（用于模型页面）
export function apiCardToModelItem(card: ApiCard): ModelItem {
    const kindMap: Record<string, "image" | "video"> = {
        "VIDEO": "video",
        "IMAGES": "image",
    };

    function guessOrgName(card: ApiCard) {
        const t = (card.id + ' ' + card.title).toLowerCase();
        if (t.includes('seedance') || t.includes('seedream')) return 'ByteDance Seed';
        if (t.includes('wan')) return 'Qwen';
        if (t.includes('qwen')) return 'Qwen';
        if (t.includes('flux')) return 'black-forest-labs';
        if (t.includes('vidu')) return 'Vidu';
        if (t.includes('minimax') || t.includes('hailuo')) return 'Minimax';
        if (t.includes('kling')) return 'Kling AI';
        if (t.includes('nano') || t.includes('banana')) return 'Google Gemini';
        if (t.includes('z-image') || t.includes('tongyi')) return 'Tongyi-MAI';
        return 'Stratoflow';
    }

    function guessOrgLogo(card: ApiCard) {
        const t = (card.id + ' ' + card.title).toLowerCase();
        if (t.includes('seedance') || t.includes('seedream')) return getAssetUrl('logos/doubao-color.svg');
        if (t.includes('wan')) return getAssetUrl('logos/qwen-color.svg');
        if (t.includes('qwen')) return getAssetUrl('logos/qwen-color.svg');
        if (t.includes('flux')) return getAssetUrl('logos/flux.svg');
        if (t.includes('z-image') || t.includes('tongyi')) return getAssetUrl('logos/qwen-color.svg');
        // 如需专门匹配 gemini，可使用上面的注释行
        if (t.includes('nano') || t.includes('banana')) return getAssetUrl('logos/gemini-color.svg');
        if (t.includes('gemini')) return getAssetUrl('logos/gemini-color.svg');
        if (t.includes('openai')) return getAssetUrl('logos/openai.svg');

        // 补充的 logo 映射
        if (t.includes('vidu')) return getAssetUrl('logos/vidu-color.svg');
        if (t.includes('minimax') || t.includes('hailuo')) return getAssetUrl('logos/minimax-color.svg');
        if (t.includes('kling')) return getAssetUrl('logos/kling-color.svg');
        return undefined;
    }

    // 日英翻译映射
    const descriptionTranslations: Record<string, string> = {
        "静止イメージを映画的な映像表現へ。高い一貫性と臨場感を備えた1080p動画生成に対応。": "Transform still images into cinematic video. Supports 1080p video generation with high consistency and immersion.",
        "カメラ指示や動きを制御可能な動画生成モデル。滑らかな人体表現と映画品質の映像表現が特長。": "Video generation model with camera and motion control. Features smooth human rendering and cinema-quality visuals.",
        "MoEアーキテクチャを採用し、高品質な5秒動画（480p / 720p）生成に対応。": "MoE architecture enabling high-quality 5-second video generation (480p/720p).",
        "Seedanceのスタンダードモデル。安定した動画生成能力と幅広いスタイルへの適応性。": "Seedance standard model. Stable video generation with wide style adaptability.",
        "Seedanceのプロフェッショナル版。より複雑な動きと長時間の動画生成を実現。": "Seedance professional version. Enables complex motion and longer video generation.",
        "Kling AIによる次世代動画生成。物理シミュレーションと高精細なレンダリング能力。": "Next-gen video generation by Kling AI. Physics simulation and high-fidelity rendering.",
        "テキスト描画に強みを持つ高精度画像生成モデル。複雑なレイアウトと自然な表現を両立。": "High-precision image model excelling at text rendering. Balances complex layouts with natural expression.",
        "軽量かつ高速な画像生成モデル。中英テキスト描画の正確さと高い指示追従性を実現。": "Lightweight, fast image model. Accurate Chinese/English text rendering with high prompt adherence.",
        "高精度なテキスト描画と柔軟なパラメータ調整に対応した、プロダクション向け画像生成・編集モデル。": "Production-ready image generation and editing model with precise text rendering and flexible parameters.",
        "テキスト・単一画像・複数画像入力に対応し、一貫したスタイルと構図制御が可能な画像生成モデル。": "Image model supporting text, single and multiple image inputs with consistent style and composition control.",
        "Seedream の派生モデル。画像生成と編集に強い能力を持つ最新バージョン。": "Seedream derivative model. Latest version with strong image generation and editing capabilities.",
        "高効率な小型モデルで、高速な画像生成に最適化されています。": "High-efficiency compact model optimized for fast image generation.",
    };

    const oneLiner_en = descriptionTranslations[card.description] || card.description;

    return {
        id: card.id,
        name: card.title,
        version: "v1.0",
        org: guessOrgName(card),
        orgLogo: guessOrgLogo(card),
        // 填充表格对应列的字段（标签1..标签8）
        category: card.label === "VIDEO" ? "Text-to-Video" : "Text-to-Image", // 标签1
        kind: kindMap[card.label] || "image",
        previewVideoUrl: card.videoUrl,
        oneLiner: card.description,
        oneLiner_en: oneLiner_en,
        summary: card.description,
        summary_en: oneLiner_en,
        tags: [card.label === "VIDEO" ? "動画生成" : "画像生成", "生成AI", "API"],
        tags_en: [card.label === "VIDEO" ? "Video Generation" : "Image Generation", "Generative AI", "API"],
        coverUrl: card.imageUrl,
        pricing: {
            unit: card.label === "VIDEO" ? "per_minute" : "per_image",
            valueJpy: card.label === "VIDEO" ? 5.0 : 2.0,
            taxIncluded: true
        },
        links: {
            docs: `/docs/${card.id}`,
        },
        capabilities: {
            inputs: ["text"],
            outputs: [card.label === "VIDEO" ? "video" : "image"],
        },
        latency: { p50: card.label === "VIDEO" ? 3000 : 1500, p95: card.label === "VIDEO" ? 8000 : 4000 },
        popularity: 800,
        // 额外表格字段：release/extra/capabilityDetail/pricingNote
        release: "近日公開予定",
        release_en: "Coming Soon",
        extra: undefined,
        capabilityDetail: card.label === "VIDEO" ? "動画生成/高品質" : "画像生成/画像編集",
        capabilityDetail_en: card.label === "VIDEO" ? "Video Generation/High Quality" : "Image Generation/Editing",
        // 仅对图片模型显示 pricingNote（标签8），视频保留具体价格
        pricingNote: "※ 料金は順次公開予定",
        pricingNote_en: "※ Pricing coming soon",
        secondaryLabel: card.secondaryLabel,
    };
}

// 获取所有模型数据（用于模型页面）
export const CAROUSEL_MODELS: ModelItem[] = apiCards.map(apiCardToModelItem);

// 用于3D轮播弹窗的模型数据（从carouselCards生成，确保图片/视频一致）
export const CAROUSEL_DISPLAY_MODELS: ModelItem[] = carouselCards.map(apiCardToModelItem);
