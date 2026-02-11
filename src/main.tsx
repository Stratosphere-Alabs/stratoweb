import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initWebVitals } from "./utils/reportWebVitals";
console.log("R2_BASE", import.meta.env.VITE_R2_ASSET_URL);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 初始化 Web Vitals 上报
initWebVitals();
