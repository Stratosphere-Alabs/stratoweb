import React, { useEffect, useRef, useState } from "react";

type Props = {
  animated?: boolean;       // true: 进入视窗时画线
  delay?: number;           // 整体延迟（毫秒）
};

const StrengthLinesBackground: React.FC<Props> = ({
  animated = false,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  // 使用 IntersectionObserver 检测进入视窗
  useEffect(() => {
    if (!animated || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      {
        threshold: 0.3, // 30% 可见时触发
        rootMargin: "0px 0px -100px 0px", // 需要更多区域进入视窗才触发
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [animated]);

  // 当可见时启动从左到右画线动画
  useEffect(() => {
    if (!animated || !svgRef.current) return;

    const paths = Array.from(svgRef.current.querySelectorAll("path"));

    // 初始化：设置所有线条为隐藏状态
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    // 当进入视窗时，启动动画
    if (isVisible) {
      paths.forEach((path, index) => {
        const staggerDelay = delay / 1000 + index * 0.2;

        // 更慢更丝滑的从左到右画线效果
        path.style.transition = `stroke-dashoffset 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${staggerDelay}s`;

        requestAnimationFrame(() => {
          path.style.strokeDashoffset = "0";
        });
      });
    }
  }, [animated, isVisible, delay]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1544 723"
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M5.48813 510.078C29.6022 488.268 67.6783 461.172 108.964 433.419C150.25 405.665 182.778 388.302 229.474 369.32C276.17 350.338 336.048 330.263 460.365 308.589C584.682 286.916 771.624 264.252 891.529 244.92C1011.43 225.589 1058.64 210.276 1113.65 185.393C1168.66 160.51 1230.05 126.52 1288.99 87.7325C1347.94 48.9448 1402.59 6.38884 1444.01 -30.5098C1485.43 -67.4084 1505.1 -87.5417 1523.62 -110.451"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d="M5.48813 349.87C21.8857 327.649 43.9429 299.095 78.8548 262.209C113.767 225.323 153.198 189.74 213.868 150.586C274.537 111.432 355.249 69.7867 418.223 40.8921C481.196 11.9975 523.985 -2.88385 566.891 -14.5703C609.796 -26.2568 651.52 -34.2975 745.163 -42.1246C838.806 -49.9517 983.104 -57.3215 1086.98 -67.5304C1190.86 -77.7394 1253.45 -92.6457 1313.48 -111"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d="M5.48813 657.864C21.5507 644.179 42.729 631.54 66.8704 617.329C91.0119 603.118 118.378 588.854 149.401 575.156C180.424 561.459 214.275 548.76 270.645 534.21C327.016 519.661 404.881 503.646 549.654 487.664C694.428 471.681 903.749 456.217 1040.15 440.402C1176.55 424.588 1233.68 408.89 1278.33 394.067C1322.98 379.244 1353.41 365.771 1409.03 333.141C1464.65 300.511 1544.53 249.133 1607.34 202.484C1670.15 155.835 1699.93 116.692 1699.93 116.692"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d="M-45.1217 602.294C-23.8852 594.469 2.53688 589.321 32.5981 583.641C62.6593 577.961 96.197 573.287 133.494 570.354C170.792 567.42 210.833 566.368 275.585 570.927C340.337 575.486 428.587 585.686 588.642 617.846C748.696 650.005 977.879 703.814 1128.9 733.389C1279.92 762.964 1345.82 766.676 1398.07 767.131C1450.32 767.586 1486.92 764.672 1556.14 751.692C1625.37 738.712 1726.11 715.753 1807.15 691.721C1888.19 667.689 1931.58 640.01 1931.58 640.01"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d="M5.48813 184.177C40.412 176.29 86.3277 170.383 184.461 167.764C282.595 165.144 417.834 169.175 679.38 221.357C940.925 273.54 1417.2 391.686 1698.64 448.08"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default StrengthLinesBackground;