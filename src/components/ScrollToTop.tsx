import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 路由切换时自动滚动到页面顶部
 * 确保用户进入新页面时从顶部开始浏览
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // 路由变化后立即滚动到顶部
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
