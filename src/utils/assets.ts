/**
 * 资源工具
 *
 * 构建静态资源的完整 URL。
 * 若设置了 VITE_R2_ASSET_URL 则使用远端地址，否则回退到本地 public 路径。
 */

export const getAssetUrl = (path: string): string => {
    // 确保路径不以斜杠开头，避免基地址带尾斜杠时出现双斜杠
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    const baseUrl = import.meta.env.VITE_R2_ASSET_URL;
    console.log('[Assets] Base URL:', baseUrl); // 调试日志

    // 如果配置了 Cloudflare R2 的地址，则优先使用
    if (baseUrl) {
        // 去掉基地址末尾的斜杠
        const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        return `${cleanBase}/${cleanPath}`;
    }

    // 否则使用本地 public 目录（确保以 / 开头）
    return `/${cleanPath}`;
};
