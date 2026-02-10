import React, { useEffect, useRef, useState } from 'react';

interface FadeInViewProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    className?: string;
    threshold?: number;
}

const FadeInView: React.FC<FadeInViewProps> = ({
    children,
    delay = 0,
    duration = 600,
    direction = 'up',
    distance = 30,
    className = '',
    threshold = 0.1,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    const getTransform = () => {
        if (isVisible) return 'translate3d(0, 0, 0)';

        switch (direction) {
            case 'up':
                return `translate3d(0, ${distance}px, 0)`;
            case 'down':
                return `translate3d(0, -${distance}px, 0)`;
            case 'left':
                return `translate3d(${distance}px, 0, 0)`;
            case 'right':
                return `translate3d(-${distance}px, 0, 0)`;
            case 'none':
            default:
                return 'translate3d(0, 0, 0)';
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </div>
    );
};

export default FadeInView;
