import React, { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useTexture, useVideoTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Link } from "react-router-dom";
import { carouselCards, CAROUSEL_DISPLAY_MODELS } from "@/data/models";
import { ModelDetailDialog } from "@/components/ModelGallery";
import type { ModelItem } from "@/components/ModelGallery";
import { useLanguage } from "@/LanguageContext";

// 使用预选的 7 条数据
const displayCards = carouselCards;

// =========================================================
// 1. 曲面图片卡片组件
// =========================================================
interface CurvedImageCardProps {
    url: string;
    width?: number;
    height?: number;
    radius?: number;
    segments?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    onClick?: () => void;
}

// 自定义着色器材质（实现圆角）
const ImagePanelMaterial = shaderMaterial(
    {
        map: new THREE.Texture(),
        radius: 0.1,
        uSize: new THREE.Vector2(1, 1),
        zoom: 1.0,
    },
    // 顶点着色器
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // 片元着色器
    `
    uniform sampler2D map;
    uniform float radius;
    uniform vec2 uSize;
    varying vec2 vUv;

    // 圆角矩形的 SDF
    float sdRoundedBox(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
    }
// 线性空间转换为 sRGB
    vec3 linearToSRGB(vec3 linear) {
        return vec3(
            linear.r <= 0.0031308 
                ? linear.r * 12.92 
                : 1.055 * pow(linear.r, 1.0/2.4) - 0.055,
            linear.g <= 0.0031308 
                ? linear.g * 12.92 
                : 1.055 * pow(linear.g, 1.0/2.4) - 0.055,
            linear.b <= 0.0031308 
                ? linear.b * 12.92 
                : 1.055 * pow(linear.b, 1.0/2.4) - 0.055
        );
    }

    void main() {
      // 基于尺寸的局部坐标
      vec2 uv = vUv - 0.5;
      vec2 size = uSize;
      vec2 p = uv * size;
      // 计算半尺寸盒子
      vec2 b = size * 0.5;
      
      float dist = sdRoundedBox(p, b, radius);
      
      // 平滑边缘以抗锯齿
      float alpha = 1.0 - smoothstep(0.0, 0.02, dist);
      
      if (alpha < 0.01) discard;
      
      vec4 texColor = texture2D(map, vUv);
      vec3 srgbColor = linearToSRGB(texColor.rgb);
      gl_FragColor = vec4(srgbColor, alpha);
    }
  `
);
extend({ ImagePanelMaterial });

// 将自定义元素加入 TypeScript 的 JSX 命名空间
declare global {
    namespace JSX {
        interface IntrinsicElements {
            imagePanelMaterial: unknown;
        }
    }
}
const CurvedImageCard: React.FC<CurvedImageCardProps> = ({
    url,
    width = 3,
    height = 5,
    radius = 5,
    segments = 32,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    onClick,
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(url);

    // 确保纹理使用 sRGB 颜色空间，避免图片变暗
    useEffect(() => {
        texture.colorSpace = THREE.SRGBColorSpace;
    }, [texture]);

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(width, height, segments, 1);
        const posAttribute = geo.attributes.position;

        for (let i = 0; i < posAttribute.count; i++) {
            const x = posAttribute.getX(i);
            const theta = x / radius;
            const xPrime = radius * Math.sin(theta);
            const zPrime = radius * (Math.cos(theta) - 1);
            posAttribute.setXYZ(i, xPrime, posAttribute.getY(i), zPrime);
        }

        geo.computeVertexNormals();
        return geo;
    }, [width, height, radius, segments]);

    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
        return () => { document.body.style.cursor = 'auto'; };
    }, [hovered]);
    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            position={position}
            rotation={rotation}
            scale={scale}
            onClick={(e) => {
                e.stopPropagation();
                // 只有在有 onClick 处理器时才触发
                if (onClick) {
                    onClick();
                }
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* @ts-expect-error imagePanelMaterial 由 extend 注入 */}
            <imagePanelMaterial
                transparent
                side={THREE.DoubleSide}
                map={texture}
                uSize={new THREE.Vector2(width, height)}
                radius={0.2} // 圆角半径
            />
        </mesh>
    );
};
// =========================================================
// 1b. 曲面视频卡片组件
// =========================================================
interface CurvedVideoCardProps {
    url: string;
    width?: number;
    height?: number;
    radius?: number;
    segments?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    onClick?: () => void;
}

const CurvedVideoCard: React.FC<CurvedVideoCardProps> = ({
    url,
    width = 3,
    height = 5,
    radius = 5,
    segments = 32,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    onClick,
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    // 加载视频纹理及参数
    const texture = useVideoTexture(url, {
        unsuspend: 'canplay',
        muted: true,
        loop: true,
        start: true,
        playsInline: true,
    });

    // 确保纹理使用 sRGB 颜色空间
    useEffect(() => {
        texture.colorSpace = THREE.SRGBColorSpace;
    }, [texture]);

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(width, height, segments, 1);
        const posAttribute = geo.attributes.position;

        for (let i = 0; i < posAttribute.count; i++) {
            const x = posAttribute.getX(i);
            const theta = x / radius;
            const xPrime = radius * Math.sin(theta);
            const zPrime = radius * (Math.cos(theta) - 1);
            posAttribute.setXYZ(i, xPrime, posAttribute.getY(i), zPrime);
        }

        geo.computeVertexNormals();
        return geo;
    }, [width, height, radius, segments]);

    const [hovered, setHovered] = useState(false);
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
        return () => { document.body.style.cursor = 'auto'; };
    }, [hovered]);

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            position={position}
            rotation={rotation}
            scale={scale}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) {
                    onClick();
                }
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* @ts-expect-error imagePanelMaterial 由 extend 注入 */}
            <imagePanelMaterial
                transparent
                side={THREE.DoubleSide}
                map={texture}
                uSize={new THREE.Vector2(width, height)}
                radius={0.2} // 圆角半径
            />
        </mesh>
    );
};
// =========================================================
// 2. 轮播场景
// =========================================================
interface CarouselSceneProps {
    onRotationChange: (rot: number) => void;
    onCardClick: (id: string) => void;
}

const CarouselScene: React.FC<CarouselSceneProps> = ({ onRotationChange, onCardClick }) => {
    const groupRef = useRef<THREE.Group>(null);
    const rotationRef = useRef(0); // 实时记录旋转角度，保证吸附准确

    const isDragging = useRef(false);
    const lastX = useRef(0);
    const velocity = useRef(0);
    const totalDragDistance = useRef(0); // 记录拖拽的累计距离
    const needsSnap = useRef(false); // 标记动量衰减后需要吸附

    // 自动旋转的状态
    const targetRotation = useRef(0);
    const isAnimating = useRef(false);
    const autoRotateTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    // const { viewport } = useThree(); // 如需基于视口尺寸调整，可启用
    const carouselRadius = 10;
    const cardWidth = 5;
    const cardHeight = 4; // 方形卡片高度

    const stepAngle = (Math.PI * 2) / displayCards.length;
    const autoRotateInterval = 3000; // 每 3 秒切换到下一张
    const animationSpeed = 0.08; // 缓动速度（0-1，越大越快）

    // 启动自动旋转计时器
    useEffect(() => {
        const startAutoRotate = () => {
            if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
            autoRotateTimer.current = setInterval(() => {
                if (!isDragging.current) {
                    // 设定目标：下一张卡片位置（平滑过渡）
                    targetRotation.current -= stepAngle;
                    isAnimating.current = true;
                }
            }, autoRotateInterval);
        };

        startAutoRotate();

        return () => {
            if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
        };
    }, [stepAngle]);

    // 用户交互时重置定时器
    const resetTimer = () => {
        if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
        autoRotateTimer.current = setInterval(() => {
            if (!isDragging.current) {
                targetRotation.current -= stepAngle;
                isAnimating.current = true;
            }
        }, autoRotateInterval);
    };
    useFrame(() => {
        if (!groupRef.current) return;

        if (!isDragging.current) {
            if (isAnimating.current) {
                // 平滑缓动至目标，避免弹跳
                const currentRotation = rotationRef.current;
                const diff = targetRotation.current - currentRotation;
                if (Math.abs(diff) < 0.001) {
                    // 抵达目标
                    rotationRef.current = targetRotation.current;
                    isAnimating.current = false;
                    needsSnap.current = false;
                } else {
                    // 平滑插值（类似 easeOut）
                    const newRotation = currentRotation + diff * animationSpeed;
                    rotationRef.current = newRotation;
                }
            } else if (needsSnap.current) {
                // 吸附到最近的卡片
                const nearestIndex = Math.round(-rotationRef.current / stepAngle);
                targetRotation.current = -nearestIndex * stepAngle;
                isAnimating.current = true;
                needsSnap.current = false;
            } else {
                // 手动拖拽后的动量衰减
                velocity.current *= 0.92;
                if (Math.abs(velocity.current) > 0.0001) {
                    const newRotation = rotationRef.current + velocity.current;
                    rotationRef.current = newRotation;
                } else if (velocity.current !== 0) {
                    // 动量趋近于零，触发吸附
                    velocity.current = 0;
                    needsSnap.current = true;
                }
            }
        }
        groupRef.current.rotation.y = rotationRef.current;
        onRotationChange(rotationRef.current);
    });

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        isDragging.current = true;
        lastX.current = e.clientX;
        velocity.current = 0;
        totalDragDistance.current = 0; // 重置拖拽距离
        isAnimating.current = false;
        resetTimer();
    };
    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!isDragging.current) return;
        e.stopPropagation();
        const deltaX = e.clientX - lastX.current;
        lastX.current = e.clientX;
        totalDragDistance.current += Math.abs(deltaX); // 累加拖拽距离
        const move = deltaX * 0.005;
        rotationRef.current += move;
        velocity.current = move;
    };

    useEffect(() => {
        const handleUp = () => {
            if (isDragging.current) {
                isDragging.current = false;
                // 标记：动量结束后需要吸附
                needsSnap.current = true;
            }
        };
        window.addEventListener("pointerup", handleUp);
        return () => window.removeEventListener("pointerup", handleUp);
    }, [stepAngle]);
    return (
        <group
            ref={groupRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
        >
            {displayCards.map((card, i) => {
                const angle = i * stepAngle;
                const x = Math.sin(angle) * carouselRadius;
                const z = Math.cos(angle) * carouselRadius;
                const rotY = angle;

                const handleClick = () => {
                    // 拖拽距离很小才触发点击，避免松手误触
                    if (totalDragDistance.current < 5) {
                        onCardClick(card.id);
                    }
                };

                return (
                    <group key={card.id}>
                        {card.videoUrl ? (
                            <CurvedVideoCard
                                url={card.videoUrl}
                                width={cardWidth}
                                height={cardHeight}
                                radius={4}
                                position={[x, 0, z]}
                                rotation={[0, rotY, 0]}
                                onClick={handleClick}
                            />
                        ) : (
                            <CurvedImageCard
                                url={card.imageUrl}
                                width={cardWidth}
                                height={cardHeight}
                                radius={4}
                                position={[x, 0, z]}
                                rotation={[0, rotY, 0]}
                                onClick={handleClick}
                            />
                        )}
                    </group>
                );
            })}
        </group>
    );
};
// =========================================================
// 3. 主组件（容器 + 背景 + UI）
// =========================================================
const ThreeCarousel: React.FC = () => {
    const { lang } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const galleryCanvasRef = useRef<HTMLCanvasElement | null>(null);

    // 弹窗状态管理
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);

    // 波浪背景效果
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
                    if (x === 0) ctx.moveTo(x, yBase + yOffset);
                    else ctx.lineTo(x, yBase + yOffset);
                }
                ctx.stroke();
            }
        };
        draw();
        const handleResize = () => draw();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleRotationChange = (rotationY: number) => {
        const stepAngle = (Math.PI * 2) / displayCards.length;
        let normalizedIndex = Math.round(-rotationY / stepAngle) % displayCards.length;
        if (normalizedIndex < 0) normalizedIndex += displayCards.length;
        setActiveIndex(normalizedIndex);
    };

    const activeApi = displayCards[activeIndex] || displayCards[0];
    // 打开模型详情弹窗
    const openModelDialog = (id: string) => {
        const model = CAROUSEL_DISPLAY_MODELS.find(m => m.id === id);
        if (model) {
            setSelectedModel(model);
            setDialogOpen(true);
        }
    };

    // 点击当前选中的模型标题
    const handleModelClick = () => {
        openModelDialog(activeApi.id);
    };

    // 点击卡片
    const handleCardClick = (id: string) => {
        openModelDialog(id);
    };

    return (
        <section className="relative overflow-hidden bg-[#F2F2F2] pt-0 pb-24 md:pt-0 md:pb-32">
            {/* 1. 波浪背景 */}
            <div className="pointer-events-none absolute inset-0">
                <canvas ref={galleryCanvasRef} className="h-full w-full" />
            </div>

            {/* 2. Three.js 轮播 */}
            <div className="relative z-10 w-full h-[400px] md:h-[500px]">
                <Canvas camera={{ position: [0, 0, 17], fov: 45 }}>
                    <ambientLight intensity={1} />
                    <CarouselScene
                        onRotationChange={handleRotationChange}
                        onCardClick={handleCardClick}
                    />
                </Canvas>
            </div>

            {/* 3. 文本信息面板 */}
            <div className="relative z-20 flex flex-col items-center gap-6 -mt-10 pointer-events-none">
                <div
                    onClick={handleModelClick}
                    className="mt-4 max-w-4xl text-xs text-slate-600 text-center sm:text-sm pointer-events-auto px-4 cursor-pointer group"
                >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 group-hover:text-slate-700 transition-colors">
                        {activeApi.source || activeApi.label}
                    </p>
                    <h3 className={`mb-2 text-2xl font-semibold md:text-3xl bg-clip-text text-transparent group-hover:opacity-80 transition-opacity ${activeApi.gradientClass}`}>
                        {activeApi.title}
                    </h3>
                    <p className="mb-3 whitespace-nowrap text-base md:text-lg text-center group-hover:text-slate-800 transition-colors">
                        {lang === "ja" ? activeApi.description : (activeApi.description_en || activeApi.description)}
                    </p>
                    {/* 点击提示 */}
                    <div className="inline-flex items-center gap-1 text-[10px] text-slate-400 group-hover:text-blue-500 transition-colors">
                        <span>{lang === "ja" ? "詳細を見る" : "View details"}</span>
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
                <div className="w-full max-w-xl flex justify-center md:justify-end px-4 pointer-events-auto">
                    <Link
                        to="/models"
                        className="sf-link-arrow text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                        <span className="sf-link-arrow-label">{lang === "ja" ? "すべてのAIを見る" : "View all AI models"}</span>
                        <svg viewBox="0 0 13 20" aria-hidden="true" className="sf-link-arrow-icon">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* 免责声明 */}
            <div className="relative z-20 mx-auto max-w-[1400px] px-6 mt-8 pointer-events-none">
                <p className="text-[10px] text-slate-400 text-right pointer-events-auto">
                    {lang === "ja"
                        ? "※ 掲載されている画像・動画は、当該生成AIモデルによって生成されたものです。"
                        : "※ Images and videos shown are generated by the respective AI models."
                    }
                </p>
            </div>

            {/* 4. 模型详情弹窗 */}
            <ModelDetailDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                model={selectedModel}
            />
        </section>
    );
};

export default ThreeCarousel;
