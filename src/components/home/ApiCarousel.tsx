import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAssetUrl } from "@/utils/assets";

type ApiCard = {
    id: string;
    imageUrl: string;
    label: string;
    title: string;
    description: string;
    gradientClass: string;
};

const apiCards: ApiCard[] = [
    {
        id: "api-1",
        imageUrl: getAssetUrl("Wan2.2-T2V-A14B.png"),
        label: "VIDEO",
        title: "Wan2.2-T2V-A14B",
        description:
            "MoEアーキテクチャを採用し、高品質な5秒動画（480p / 720p）生成に対応。",
        gradientClass:
            "bg-gradient-to-r from-slate-900 via-blue-600 to-sky-400",
    },
    {
        id: "api-2",
        imageUrl: getAssetUrl("FLUX.2-flex.png"),
        label: "IMAGES",
        title: "FLUX.2-flex",
        description:
            "高精度なテキスト描画と柔軟なパラメータ調整に対応した、プロダクション向け画像生成・編集モデル。",
        gradientClass:
            "bg-gradient-to-r from-slate-900 via-sky-600 to-cyan-400",
    },
    {
        id: "api-3",
        imageUrl: getAssetUrl("Qwen-Image.png"),
        label: "IMAGES",
        title: "Qwen-Image",
        description:
            "テキスト描画に強みを持つ高精度画像生成モデル。複雑なレイアウトと自然な表現を両立。",
        gradientClass:
            "bg-gradient-to-r from-slate-900 via-violet-500 to-amber-400",
    },
    {
        id: "api-4",
        imageUrl: getAssetUrl("Seedream-4-0-250828.png"),
        label: "IMAGES",
        title: "Seedream-4-0-250828",
        description:
            "テキスト・単一画像・複数画像入力に対応し、一貫したスタイルと構図制御が可能な画像生成モデル。",
        gradientClass:
            "bg-gradient-to-r from-slate-900 via-emerald-500 to-teal-300",
    },
    {
        id: "api-5",
        imageUrl: getAssetUrl("Viduq2-pro.png"),
        label: "VIDEO",
        title: "Viduq2-pro",
        description:
            "静止イメージを映画的な映像表現へ。高い一貫性と臨場感を備えた1080p動画生成に対応。",
        gradientClass:
            "bg-gradient-to-r from-slate-900 via-emerald-500 to-amber-400",
    },
    {
        id: "api-6",
        imageUrl: getAssetUrl("Minimax-Hailuo-2.3.png"),
        label: "VIDEO",
        title: "Minimax-Hailuo-2.3",
        description:
            "カメラ指示や動きを制御可能な動画生成モデル。滑らかな人体表現と映画品質の映像表現が特長。",
        gradientClass:
            "bg-gradient-to-r from-slate-900 via-sky-500 to-cyan-300",
    },
    {
        id: "api-7",
        imageUrl: getAssetUrl("zimageturbo.png"),
        label: "IMAGES",
        title: "Tongyi-MAI/Z-Image-Turbo",
        description:
            "軽量かつ高速な画像生成モデル。中英テキスト描画の正確さと高い指示追従性を実現。",
        gradientClass:
            "bg-gradient-to-r from-slate-900 via-orange-500 to-rose-400",
    },
];

const ApiCarousel: React.FC = () => {
    // 使用递增计数器，轮播角度持续累加
    const [rotationCount, setRotationCount] = useState(0);
    const [isDraggingState, setIsDraggingState] = useState(false);
    const [dragAngle, setDragAngle] = useState(0);

    const apiStep = 360 / apiCards.length;
    const carouselAngle = -rotationCount * apiStep + dragAngle;

    // 计算当前展示的卡片索引（支持循环）
    const apiIndex = ((rotationCount % apiCards.length) + apiCards.length) % apiCards.length;
    const activeApi = apiCards[apiIndex];

    const dragStartX = useRef<number | null>(null);
    const dragDeltaX = useRef(0);
    const isDragging = useRef(false);
    const galleryCanvasRef = useRef<HTMLCanvasElement | null>(null);

    // 预留的左右导航函数，暂未使用
    // const handleNext = () => { // 备用：切换到下一张
    //     setRotationCount((prev) => prev + 1);
    // };

    // const handlePrev = () => { // 备用：切换到上一张
    //     setRotationCount((prev) => prev - 1);
    // };

    // 记录拖拽前已有的旋转角度
    const accumulatedAngle = useRef(0);

    const beginDrag = (clientX: number) => {
        dragStartX.current = clientX;
        dragDeltaX.current = 0;
        isDragging.current = true;
        setIsDraggingState(true);
        // 记住拖拽开始时的角度
        accumulatedAngle.current = -rotationCount * apiStep;
    };

    const updateDrag = (clientX: number) => {
        if (!isDragging.current || dragStartX.current === null) return;
        const deltaX = clientX - dragStartX.current;
        dragDeltaX.current = deltaX;
        // 将拖拽距离转换为角度（提高响应度）
        setDragAngle(deltaX * 0.5);
    };

    const endDrag = () => {
        if (!isDragging.current) return;
        const deltaX = dragDeltaX.current;

        // 拖拽超过阈值则移动一格
        const threshold = 60;

        if (Math.abs(deltaX) > threshold) {
            // 仅向拖拽方向移动一步
            const direction = deltaX > 0 ? -1 : 1;
            setRotationCount((prev) => prev + direction);
        }

        dragStartX.current = null;
        dragDeltaX.current = 0;
        isDragging.current = false;
        setIsDraggingState(false);
        setDragAngle(0);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        beginDrag(event.clientX);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        updateDrag(event.clientX);
    };

    const handleMouseUp = () => {
        endDrag();
    };

    // 鼠标移出容器时不立即结束拖拽，等待松开按键
    const handleMouseLeave = () => {
        // 只有松开鼠标才结束
        // 按住拖拽时即使移出也保持拖拽状态
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0];
        if (!touch) return;
        event.preventDefault();
        beginDrag(touch.clientX);
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const touch = event.touches[0];
        if (!touch) return;
        updateDrag(touch.clientX);
    };

    const handleTouchEnd = () => {
        endDrag();
    };

    // 拖拽时注册全局鼠标事件，确保移出容器仍能跟踪
    useEffect(() => {
        if (!isDraggingState) return;

        const handleGlobalMouseMove = (event: MouseEvent) => {
            updateDrag(event.clientX);
        };

        const handleGlobalMouseUp = () => {
            endDrag();
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDraggingState]);

    useEffect(() => {
        if (isDraggingState) return;

        const id = setInterval(() => {
            setRotationCount((prev: number) => prev + 1);
        }, 4000);

        return () => clearInterval(id);
    }, [isDraggingState]);

    useEffect(() => {
        const canvas = galleryCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            const width = canvas.clientWidth || canvas.width || 1000;
            const height = canvas.clientHeight || canvas.height || 500;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            ctx.clearRect(0, 0, width, height);

            const lines = 28;
            const maxAmplitude = 40;
            const gap = height / lines;

            ctx.lineWidth = 1.5;

            for (let i = 0; i <= lines; i++) {
                ctx.beginPath();

                const depthRatio = i / lines;
                const alpha = 0.1 + depthRatio * 0.9;
                ctx.strokeStyle = `rgba(219, 219, 219, ${alpha})`;

                const yBase = i * gap;

                for (let x = 0; x < width; x += 2) {
                    const xRatio = x / width;
                    const growFactor = Math.pow(xRatio, 1);
                    const currentAmp = growFactor * maxAmplitude;

                    const wave = Math.sin(x * 0.01 + i * 0.5);
                    const yOffset = wave * currentAmp;

                    if (x === 0) {
                        ctx.moveTo(x, yBase + yOffset);
                    } else {
                        ctx.lineTo(x, yBase + yOffset);
                    }
                }

                ctx.stroke();
            }
        };

        draw();

        const handleResize = () => draw();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#F2F2F2] pt-10 pb-24 md:pt-14 md:pb-32">
            {/* Canvas background */}
            <div className="pointer-events-none absolute inset-0">
                <canvas ref={galleryCanvasRef} className="h-full w-full" />
            </div>

            {/* Gallery Content */}
            <div className="relative">
                {/* Title removed to avoid duplication with Home page transition header */}

                {/* Carousel + Description + CTA */}
                <div className="flex flex-col items-center gap-6">
                    {/* Rotating Carousel */}
                    <div className="w-full max-w-xl py-2 md:py-6">
                        <div
                            className="relative mx-auto h-72 w-full sm:h-80 md:h-96"
                            style={{ perspective: "1200px" }}
                        >
                            <div
                                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: `translateZ(-360px) rotateY(${carouselAngle}deg)`,
                                    transition: isDraggingState
                                        ? "none"
                                        : "transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
                                }}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseLeave}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {apiCards.map((card, index) => {
                                    const rotateY = apiStep * index;
                                    const total = apiCards.length;
                                    const rawDiff = index - apiIndex;
                                    const wrappedDiff = ((rawDiff % total) + total) % total;
                                    const distance = Math.min(wrappedDiff, total - wrappedDiff);

                                    const scale = Math.max(0.6, 1 - distance * 0.18);

                                    return (
                                        <article
                                            key={card.id}
                                            className="absolute left-1/2 top-1/2 w-[72%] max-w-xs -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[32px] shadow-[0_26px_60px_rgba(15,23,42,0.22)] sm:w-[60%] sm:max-w-sm sm:rounded-[40px]"
                                            style={{
                                                transform: `rotateY(${rotateY}deg) translateZ(560px) scale(${scale})`,
                                            }}
                                        >
                                            <div className="relative overflow-hidden rounded-[40px]">
                                                <img
                                                    src={card.imageUrl}
                                                    alt={card.id}
                                                    loading="lazy"
                                                    crossOrigin="anonymous"
                                                    className="w-full aspect-square object-cover"
                                                    draggable={false}
                                                />
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4 max-w-xl text-xs text-slate-600 text-center sm:text-sm">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {activeApi.label}
                        </p>
                        <h3
                            className={`mb-2 text-xl font-semibold bg-clip-text text-transparent md:text-2xl ${activeApi.gradientClass}`}
                        >
                            {activeApi.title}
                        </h3>
                        <p className="mb-3 leading-relaxed">{activeApi.description}</p>
                    </div>

                    {/* CTA */}
                    <div className="w-full max-w-xl flex justify-end">
                        <Link
                            to="/docs/api-reference"
                            className="sf-link-arrow text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900"
                        >
                            <span className="sf-link-arrow-label">すべてのAIを見る</span>
                            <svg
                                viewBox="0 0 13 20"
                                aria-hidden="true"
                                className="sf-link-arrow-icon"
                            >
                                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                            </svg>
                        </Link>
                    </div>
                    {/* Disclaimer below carousel */}
                    <div className="mt-6 mx-auto max-w-6xl px-6 md:px-10">
                        <p className="text-xs text-slate-500 text-center">
                            ※ 本ページに掲載されている画像・動画等の視覚的表現は、すべて当該生成AIモデルによって生成されたものです。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApiCarousel;
