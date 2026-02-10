import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);

        // 生产环境可将错误上报到监控服务
        if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
            // TODO: 接入 Sentry 或其它错误上报服务
            // Sentry.captureException(error, { extra: errorInfo });
        }
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4">
                    <div className="max-w-2xl w-full">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
                            {/* 错误图标 */}
                            <div className="mb-6">
                                <svg
                                    className="w-20 h-20 mx-auto text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                                エラーが発生しました
                            </h2>

                            <p className="text-slate-600 mb-8">
                                申し訳ございません。予期しないエラーが発生しました。
                                <br />
                                ページを更新するか、後ほど再度お試しください。
                            </p>

                            {/* 仅在开发环境展示错误详情 */}
                            {import.meta.env.DEV && this.state.error && (
                                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                                    <p className="text-sm font-mono text-red-800 mb-2">
                                        <strong>Error:</strong> {this.state.error.message}
                                    </p>
                                    <pre className="text-xs text-red-700 overflow-auto max-h-40">
                                        {this.state.error.stack}
                                    </pre>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20"
                                >
                                    ホームに戻る
                                </button>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl border border-slate-200 transition-all hover:-translate-y-0.5"
                                >
                                    ページを更新
                                </button>
                            </div>

                            <p className="mt-8 text-sm text-slate-500">
                                問題が解決しない場合は、
                                <a href="/contact-sales" className="text-blue-600 hover:underline ml-1">
                                    お問い合わせ
                                </a>
                                ください。
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
