import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import { WaitlistModalProvider } from "./contexts/WaitlistModalContext";
import WaitlistModal from "./components/WaitlistModal";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";

// 模型相关页面
import ModelsIndex from "./pages/models/ModelsIndex";
import ModelDetail from "./pages/models/ModelDetail";

// 产品介绍
import Products from "./pages/products/Products";
import PlatformServerless from "./pages/products/PlatformServerless";
import PrivateCloud from "./pages/products/PrivateCloud";

// 公司信息
import About from "./pages/company/About";

// 成功案例
import CaseStudies from "./pages/case-studies/CaseStudies";
import CaseStudyDetail from "./pages/case-studies/CaseStudyDetail";

// 联系销售
import ContactSales from "./pages/contact/ContactSales";

// 账号与等待列表
import Login from "./pages/auth/Login";
import WaitingList from "./pages/WaitingList";

// 法务合规
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import CommercialTransaction from "./pages/legal/CommercialTransaction";

// 控制台（仪表盘及子页）
import Dashboard from "./pages/console/Dashboard";
import ApiKeys from "./pages/console/ApiKeys";
import Usage from "./pages/console/Usage";
import Billing from "./pages/console/Billing";
import Settings from "./pages/console/Settings";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // 最小展示时长，保证加载动画的观感
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoader(false);
  };

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <WaitlistModalProvider>
          {showLoader && (
            <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />
          )}
          <BrowserRouter>
            <ScrollToTop />
            <WaitlistModal />
            <CookieConsent />
            <div className="font-sans">
              <Routes>
                {/* 官网公共页面 */}
                <Route path="/" element={<Home />} />

                {/* 模型目录 */}
                <Route path="/models" element={<ModelsIndex />} />
                <Route path="/models/:modelId" element={<ModelDetail />} />

                {/* 产品与方案 */}
                <Route path="/products" element={<Products />} />
                <Route path="/products/platform" element={<PlatformServerless />} />
                <Route path="/products/private-cloud" element={<PrivateCloud />} />

                {/* 公司介绍 */}
                <Route path="/company/about" element={<About />} />

                {/* 客户案例 */}
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:id" element={<CaseStudyDetail />} />

                {/* 联系我们 */}
                <Route path="/contact-sales" element={<ContactSales />} />

                {/* 登录与等待名单 */}
                <Route path="/login" element={<Login />} />
                <Route path="/waitlist" element={<WaitingList />} />

                {/* 控制台 */}
                <Route path="/console" element={<Dashboard />} />
                <Route path="/console/api-keys" element={<ApiKeys />} />
                <Route path="/console/usage" element={<Usage />} />
                <Route path="/console/billing" element={<Billing />} />
                <Route path="/console/settings" element={<Settings />} />

                {/* 法务条款 */}
                <Route path="/legal/privacy" element={<Privacy />} />
                <Route path="/legal/terms" element={<Terms />} />
                <Route path="/legal/specified-commercial-transaction" element={<CommercialTransaction />} />

                {/* 404 未找到（兜底路由） */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </WaitlistModalProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
