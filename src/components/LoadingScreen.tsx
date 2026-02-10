import React, { useEffect, useState } from "react";
import { getAssetUrl } from "@/utils/assets";

interface LoadingScreenProps {
    isLoading: boolean;
    onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onComplete }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            // 开始退出动画
            setIsExiting(true);
            // 动画结束后触发 onComplete 以卸载组件
            const timer = setTimeout(() => {
                setIsVisible(false);
                onComplete();
            }, 800); // 稍微延长以获得更顺滑的退出效果
            return () => clearTimeout(timer);
        }
    }, [isLoading, onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFAFA] transition-all duration-700 ease-out ${isExiting ? "opacity-0" : "opacity-100"
                }`}
        >
            {/* 简约 Logo */}
            <div
                className={`mb-12 transition-all duration-500 ease-out ${isExiting ? "opacity-0 -translate-y-6" : "opacity-100 translate-y-0"
                    }`}
            >
                <img
                    src={getAssetUrl("stratoflow-logo.png")}
                    alt="Stratoflow"
                    className="h-10 w-auto md:h-12"
                />
            </div>

            {/* 细线条进度条 */}
            <div className="relative h-[1px] w-32 overflow-hidden bg-gray-200 md:w-48">
                {/* 动画中的进度提示 */}
                <div
                    className={`absolute inset-y-0 left-0 bg-gray-400 ${isExiting
                        ? "w-full transition-all duration-400 ease-out"
                        : "animate-loading-progress"
                        }`}
                />
            </div>

            {/* 极简文本 */}
            <p
                className={`mt-8 text-[10px] font-light tracking-[0.3em] uppercase text-gray-400 transition-all duration-500 ${isExiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                    }`}
            >
                Loading
            </p>
        </div>
    );
};

export default LoadingScreen;
