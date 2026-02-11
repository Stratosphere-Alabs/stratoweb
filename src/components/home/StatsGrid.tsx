import React, { useState, useEffect, useRef } from "react";

interface StatCardProps {
    value: string;
    suffix: string;
    suffixColor: string;
    prefix?: string;
    prefixColor?: string;
    label: string;
    delay: number;
}

// 计数动画的自定义 Hook
const useCountUp = (end: number, duration: number = 2000, startTrigger: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startTrigger) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // 缓动函数，让减速更平滑
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, startTrigger]);

    return count;
};

const StatCard: React.FC<StatCardProps> = ({
    value,
    suffix,
    suffixColor,
    prefix,
    prefixColor,
    label,
    delay
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // 从展示值中提取数字用于计数
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const count = useCountUp(numericValue, 1500, isVisible);

    // 使用 IntersectionObserver 触发动画
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // 进入视窗后再延迟启动动画
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    // 按原格式显示计数结果（保留小数与否）
    const formatCount = () => {
        if (value.includes('.')) {
            return count.toFixed(1);
        }
        return count.toString();
    };

    return (
        <div
            ref={cardRef}
            className={`group relative rounded-2xl overflow-hidden p-6 md:p-8 
                  transition-all duration-700 ease-out
                  ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
        >
            {/* Animated border - draws itself */}
            <div
                className={`absolute inset-0 rounded-2xl border border-white/30 transition-all duration-1000
                    ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(12px)',
                }}
            />

            {/* Scan line effect */}
            <div
                className={`absolute inset-0 overflow-hidden rounded-2xl pointer-events-none
                    ${isVisible ? 'animate-scan-line' : ''}`}
            >
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{ top: '0%' }} />
            </div>

            {/* Corner glow */}
            <div
                className={`absolute -top-10 -right-10 w-20 h-20 rounded-full blur-2xl transition-opacity duration-1000
                    ${isVisible ? 'opacity-60' : 'opacity-0'}`}
                style={{ background: `radial-gradient(circle, ${suffixColor}40 0%, transparent 70%)` }}
            />

            {/* Content */}
            <div className="relative text-center">
                <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight">
                    {prefix && <span className={prefixColor}>{prefix}</span>}
                    <span className={`inline-block transition-all duration-300 ${isVisible ? '' : 'blur-sm'}`}>
                        {isVisible ? formatCount() : '0'}
                    </span>
                    <span className={suffixColor}>{suffix}</span>
                </div>
                <p className={`mt-3 text-sm text-white/60 font-medium transition-all duration-500 delay-300
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    {label}
                </p>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
        </div>
    );
};

interface StatsGridProps {
    lang: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({ lang }) => {
    const stats = [
        {
            value: "99.9",
            suffix: "%",
            suffixColor: "text-[#38BDF8]",  // 电光蓝
            label: lang === "ja" ? "API 稼働率" : "API Uptime",
        },
        {
            value: "50",
            suffix: "+",
            suffixColor: "text-[#38BDF8]",  // 电光蓝
            label: lang === "ja" ? "対応モデル数" : "AI Models",
        },
        {
            value: "50",
            prefix: "<",
            prefixColor: "text-[#38BDF8]",  // 电光蓝
            suffix: "ms",
            suffixColor: "text-[#38BDF8]",  // 电光蓝
            label: lang === "ja" ? "平均レイテンシ" : "Avg Latency",
        },
        {
            value: "24",
            suffix: "/7",
            suffixColor: "text-[#38BDF8]",  // 电光蓝
            label: lang === "ja" ? "テクニカルサポート" : "Tech Support",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    value={stat.value}
                    suffix={stat.suffix}
                    suffixColor={stat.suffixColor}
                    prefix={stat.prefix}
                    prefixColor={stat.prefixColor}
                    label={stat.label}
                    delay={index * 150}
                />
            ))}
        </div>
    );
};

export default StatsGrid;
