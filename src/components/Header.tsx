import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useWaitlistModal } from "@/contexts/WaitlistModalContext";
import { getAssetUrl } from "@/utils/assets";

// 辅助函数：滚动到页面顶部（同页导航时使用）
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ------------------------------------------------------------------
// 导航数据与组件
// ------------------------------------------------------------------

interface NavItemData {
    label: string;
    labelEn: string; // 下方的小字号英文标签
    path: string;
    dropdown?: { label: string; id: string }[];
}

const NAV_ITEMS: NavItemData[] = [
    {
        label: "ホーム",
        labelEn: "HOME",
        path: "/",
        dropdown: [
            { label: "Overview", id: "hero" },
            { label: "Model Library", id: "model-carousel" },
            { label: "Strength", id: "strength" },
            { label: "FAQ", id: "faq" },
        ]
    },
    {
        label: "モデル",
        labelEn: "MODELS",
        path: "/models",
        dropdown: [
            { label: "Top", id: "hero" },
            { label: "Search & Filter", id: "search-section" },
        ]
    },
    {
        label: "プロダクト",
        labelEn: "PRODUCTS",
        path: "/products",
        dropdown: [
            { label: "API Proxy", id: "api-proxy" },
            { label: "AI Gateway", id: "ai-gateway" },
            { label: "AI Support", id: "ai-support" },
        ]
    },
    // { label: "ドキュメント", labelEn: "DOCS", path: "/docs" },
    { label: "導入事例", labelEn: "CASE", path: "/case-studies" },
    { label: "お問い合わせ", labelEn: "CONTACT", path: "/contact-sales" },
    {
        label: "会社情報",
        labelEn: "COMPANY",
        path: "/company/about",
        dropdown: [
            { label: "Mission & Vision", id: "company-info" },
            { label: "Overview", id: "company-profile" },
            { label: "Access", id: "access" },
        ]
    },
];

interface NavItemProps {
    item: NavItemData;
    location: { pathname: string };
    isTransparent: boolean;
    textColorClasses: string;
    textActiveClasses: string;
    textHoverClasses: string;
    scrollToTop: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
    item,
    location,
    isTransparent,
    textColorClasses,
    textActiveClasses,
    textHoverClasses,
    scrollToTop
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasDropdown = !!item.dropdown;

    const isActive = item.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.path);

    // 处理导航点击
    const handleNavClick = (e: React.MouseEvent, targetId?: string) => {
        if (targetId) {
            e.preventDefault();

            // 判断当前是否在目标页面
            // 首页 (/) 需要特殊处理
            const targetPath = item.path;
            const currentPath = location.pathname;

            // 简单判断是否同一页面（/models 与 /models/ 视为相同）
            const isOnSamePage = currentPath === targetPath || (targetPath !== "/" && currentPath.startsWith(targetPath));

            if (isOnSamePage) {
                const element = document.getElementById(targetId);
                if (element) {
                    // 平滑滚动至目标
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // 跳转到目标页面并携带锚点
                window.location.href = `${targetPath}#${targetId}`;
            }
        } else {
            scrollToTop();
        }
        setIsHovered(false);
    };

    return (
        <li
            onMouseEnter={() => hasDropdown && setIsHovered(true)}
            onMouseLeave={() => hasDropdown && setIsHovered(false)}
            className="relative h-full flex items-center"
        >
            <Link
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path === '/' ? 'hero' : undefined)}
                className={`relative cursor-pointer transition-colors text-center z-10 py-2 ${isActive ? textActiveClasses : `${textColorClasses} ${textHoverClasses}`}`}
            >
                <span className="block text-xs font-medium">{item.label}</span>
                <span className={`block text-[10px] ${isTransparent ? 'text-white/60' : 'text-slate-400'}`}>[{item.labelEn}]</span>
            </Link>

            {/* Hover Dropdown Menu */}
            {hasDropdown && isHovered && (
                <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 animate-in fade-in zoom-in-95 duration-200"
                    style={{ zIndex: 100 }}
                >
                    {/* Dropdown Container - macOS Dark Glass Effect */}
                    <div className="relative rounded-lg overflow-hidden" style={{
                        boxShadow: `
                            0 10px 40px rgba(0, 0, 0, 0.3),
                            0 2px 12px rgba(0, 0, 0, 0.2),
                            inset 0 1px 0 rgba(255, 255, 255, 0.15),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                        `
                    }}>
                        {/* Dark glass background with gradient - Ultra transparent */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/10 via-slate-900/10 to-slate-950/10 backdrop-blur-3xl"></div>

                        {/* Glass shine overlay - adds glossy effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg"></div>

                        {/* Subtle border */}
                        <div className="absolute inset-0 rounded-lg border border-white/20"></div>

                        {/* Top highlight for glass reflection */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                        {/* Bottom subtle shadow for depth */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>

                        {/* Content */}
                        <div className="relative p-1">
                            <ul className="flex flex-col gap-0.5">
                                {item.dropdown?.map((subItem) => (
                                    <li key={subItem.id}>
                                        <button
                                            onClick={(e) => handleNavClick(e, subItem.id)}
                                            className="w-full text-left px-3 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all font-medium flex items-center group"
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full mr-3 bg-white/30 group-hover:bg-blue-400 transition-colors ${location.hash === `#${subItem.id}` ? 'bg-blue-400 scale-125' : ''}`}></span>
                                            {subItem.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

interface HeaderProps {
    position?: "fixed" | "sticky";
    variant?: "default" | "transparent";
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ position = "sticky", variant = "default", className = "" }) => {
    const location = useLocation();
    const { lang, setLang } = useLanguage();
    const { openModal } = useWaitlistModal();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 路径变化时关闭移动端菜单
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // 使用 sessionStorage 持久化通知关闭状态（刷新页面后会重新显示）
    const [isNotificationDismissed, setIsNotificationDismissed] = useState(() => {
        return sessionStorage.getItem('notification-dismissed') === 'true';
    });

    const handleDismissNotification = () => {
        setIsNotificationDismissed(true);
        sessionStorage.setItem('notification-dismissed', 'true');
    };

    // 位置相关的样式类
    const positionClasses =
        position === "fixed"
            ? "fixed inset-x-0 top-0"
            : "sticky top-0";

    // 透明模式（用于首页沉浸式 Hero）
    const isTransparent = variant === "transparent";

    // 背景与边框样式类
    // 透明模式使用渐变背景确保在浅色区域也能看清
    // 非透明模式使用实色背景+阴影，兼容微信浏览器
    const styleClasses = isTransparent
        ? "z-40 bg-gradient-to-b from-black/50 via-black/30 to-transparent transition-all duration-300 ease-in-out"
        : "z-40 border-b border-slate-200 bg-white/95 shadow-md transition-all duration-300 ease-in-out";

    // 文本颜色样式类
    const textColorClasses = isTransparent ? "text-white" : "text-slate-500";
    const textActiveClasses = isTransparent ? "text-white font-semibold" : "text-slate-900 font-semibold";
    const textHoverClasses = isTransparent ? "hover:text-white/80" : "hover:text-slate-900";

    return (
        <header className={`${positionClasses} ${styleClasses} ${className}`}>
            <nav className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link to="/" aria-label="Go to home">
                            <img
                                src={isTransparent ? getAssetUrl("logo2.png") : getAssetUrl("stratoflow-logo.png")}
                                alt="Stratoflow"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>


                    {/* Mobile Menu Button - Hamburger */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            className={`relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2 transition-colors z-50 ${isMobileMenuOpen
                                ? 'text-white'
                                : (isTransparent ? 'text-white' : 'text-slate-900')
                                }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-white rotate-45 translate-y-2' : 'bg-current'
                                    }`}
                            />
                            <span
                                className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-white opacity-0' : 'bg-current'
                                    }`}
                            />
                            <span
                                className={`block w-6 h-0.5 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-white -rotate-45 -translate-y-2' : 'bg-current'
                                    }`}
                            />
                        </button>
                    </div>



                    {/* Desktop Menu - Nav + Right Side */}
                    <div className="hidden md:flex items-center">
                        {/* Main Navigation - Map through NAV_ITEMS */}
                        <ul className="flex items-center gap-6 md:gap-8">
                            {NAV_ITEMS.map((item) => (
                                <NavItem
                                    key={item.label}
                                    item={item}
                                    location={location}
                                    isTransparent={isTransparent}
                                    textColorClasses={textColorClasses}
                                    textActiveClasses={textActiveClasses}
                                    textHoverClasses={textHoverClasses}
                                    scrollToTop={scrollToTop}
                                />
                            ))}
                        </ul>

                        {/* 分隔线 */}
                        <div className={`mx-4 h-6 w-px ${isTransparent ? 'bg-white/30' : 'bg-slate-300'}`} />

                        {/* Right Side: Lang + Auth */}
                        <div className="flex items-center gap-3 md:gap-4">
                            {/* Language Switcher - JP | EN style */}
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setLang("ja")}
                                    className={`text-sm font-medium transition-colors ${lang === "ja"
                                        ? `${isTransparent ? 'text-white' : 'text-slate-900'} border-b-2 ${isTransparent ? 'border-white' : 'border-slate-900'} pb-0.5`
                                        : `${isTransparent ? 'text-white/50 hover:text-white/80' : 'text-slate-400 hover:text-slate-600'}`
                                        }`}
                                >
                                    JP
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLang("en")}
                                    className={`text-sm font-medium transition-colors ${lang === "en"
                                        ? `${isTransparent ? 'text-white' : 'text-slate-900'} border-b-2 ${isTransparent ? 'border-white' : 'border-slate-900'} pb-0.5`
                                        : `${isTransparent ? 'text-white/50 hover:text-white/80' : 'text-slate-400 hover:text-slate-600'}`
                                        }`}
                                >
                                    EN
                                </button>
                            </div>

                            {/* Auth Buttons - 极简风格 */}
                            <div className="flex items-center gap-2 md:gap-3">
                                {isTransparent ? (
                                    // 透明模式：白色边框极简风格
                                    <button
                                        onClick={openModal}
                                        className="rounded-full border border-white/60 px-4 py-1 text-xs font-medium text-white transition-colors hover:bg-white/10 md:px-5 md:py-1 md:text-sm"
                                    >
                                        {lang === "ja" ? "ログイン" : "Log in"}
                                    </button>
                                ) : (
                                    // 非透明模式：原有设计
                                    <>
                                        <button
                                            onClick={openModal}
                                            className="rounded-full px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 md:px-4 md:py-1.5 md:text-sm"
                                        >
                                            {lang === "ja" ? "ログイン" : "Log in"}
                                        </button>
                                        <button
                                            onClick={openModal}
                                            className="sf-cta-skin rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm md:px-4 md:py-1.5 md:text-sm"
                                        >
                                            {lang === "ja" ? "新規登録" : "Sign up"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Liquid Glass */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full min-h-[calc(100vh-80px)] bg-slate-900/95 backdrop-blur-2xl border-t-[0.5px] border-white/20 shadow-2xl md:hidden flex flex-col p-6 animate-menu-slide-down origin-top z-50">

                    {/* Language Switcher */}
                    <div className="flex justify-end gap-6 mb-8 px-2">
                        <button
                            onClick={() => setLang("ja")}
                            className={`text-sm font-bold transition-all ${lang === "ja" ? "text-slate-900 border-b-2 border-slate-900 scale-105" : "text-slate-500 hover:text-slate-800"}`}
                        >
                            JP
                        </button>
                        <button
                            onClick={() => setLang("en")}
                            className={`text-base font-bold transition-all ${lang === "en" ? "text-slate-900 border-b-2 border-slate-900 scale-105" : "text-slate-500 hover:text-slate-800"}`}
                        >
                            EN
                        </button>
                    </div>

                    {/* Nav Links - With Dividers */}
                    <ul className="flex flex-col mb-10 divide-y-[0.5px] divide-white/20 border-t-[0.5px] border-b-[0.5px] border-white/20">
                        <li>
                            <Link to="/" className="group flex justify-between items-center px-4 py-6 text-white hover:bg-white/10 transition-colors">
                                <span className="text-lg font-bold">ホーム</span>
                                <span className="text-[10px] text-white/50 font-medium tracking-widest group-hover:text-white transition-colors">HOME</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/models" className="group flex justify-between items-center px-4 py-6 text-white hover:bg-white/10 transition-colors">
                                <span className="text-lg font-bold">モデル</span>
                                <span className="text-[10px] text-white/50 font-medium tracking-widest group-hover:text-white transition-colors">MODELS</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="group flex justify-between items-center px-4 py-6 text-white hover:bg-white/10 transition-colors">
                                <span className="text-lg font-bold">プロダクト</span>
                                <span className="text-[10px] text-white/50 font-medium tracking-widest group-hover:text-white transition-colors">PRODUCTS</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/docs" className="group flex justify-between items-center px-4 py-6 text-white hover:bg-white/10 transition-colors">
                                <span className="text-lg font-bold">ドキュメント</span>
                                <span className="text-[10px] text-white/50 font-medium tracking-widest group-hover:text-white transition-colors">DOCS</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/case-studies" className="group flex justify-between items-center px-4 py-6 text-white hover:bg-white/10 transition-colors">
                                <span className="text-lg font-bold">導入事例</span>
                                <span className="text-[10px] text-white/50 font-medium tracking-widest group-hover:text-white transition-colors">CASE</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/company/about" className="group flex justify-between items-center px-4 py-6 text-white hover:bg-white/10 transition-colors">
                                <span className="text-lg font-bold">会社情報</span>
                                <span className="text-[10px] text-white/50 font-medium tracking-widest group-hover:text-white transition-colors">COMPANY</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact-sales" className="group flex justify-between items-center px-4 py-6 text-white hover:bg-white/10 transition-colors">
                                <span className="text-lg font-bold">お問い合わせ</span>
                                <span className="text-[10px] text-white/50 font-medium tracking-widest group-hover:text-white transition-colors">CONTACT</span>
                            </Link>
                        </li>
                    </ul>

                    {/* Auth Buttons */}
                    <div className="flex flex-col gap-4 mt-auto">
                        <button
                            onClick={openModal}
                            className="w-full rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white text-center hover:bg-white/20 transition-all backdrop-blur-md"
                        >
                            {lang === "ja" ? "ログイン" : "Log in"}
                        </button>
                        <button
                            onClick={openModal}
                            className="w-full sf-cta-skin rounded-full px-6 py-4 text-sm font-bold text-white text-center shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                            {lang === "ja" ? "新規登録" : "Sign up"}
                        </button>
                    </div>
                </div>
            )}

            {/* Update Bar - Only show on pages that are not /models, not dismissed, and not in transparent mode */}
            {
                !location.pathname.startsWith('/models') && !isNotificationDismissed && !isTransparent && (
                    <div className="border-t border-b border-slate-200/80 bg-white/60">
                        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 text-[11px] text-slate-700 md:px-8 md:text-xs">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center rounded border border-sky-400 bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-600">
                                    Update
                                </span>
                                <span>
                                    {lang === "ja"
                                        ? "新しいマルチモーダルモデル「SF Vision Pro β」を Waiting List から先行提供中です。"
                                        : "New multimodal model \"SF Vision Pro β\" is now in early access via the Waiting List."}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/models"
                                    className="sf-link-arrow hidden text-[11px] font-medium text-slate-600 hover:text-slate-900 md:inline-flex"
                                >
                                    <span className="sf-link-arrow-label">
                                        {lang === "ja" ? "詳細を見る" : "View details"}
                                    </span>
                                    <svg
                                        viewBox="0 0 13 20"
                                        aria-hidden="true"
                                        className="sf-link-arrow-icon"
                                    >
                                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                    </svg>
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleDismissNotification}
                                    className="flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                                    aria-label="Close notification"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </header >
    );
};

export default Header;
