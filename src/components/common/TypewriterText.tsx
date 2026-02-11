import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 30,
    delay = 0,
    className = "",
    onComplete
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const indexRef = useRef(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 文案变化时重置打字机状态
    useEffect(() => {
        setDisplayedText("");
        setHasStarted(false);
        indexRef.current = 0;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        const startTimeout = setTimeout(() => {
            setHasStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, delay]);

    // 打字机效果
    useEffect(() => {
        if (!hasStarted) return;

        const typeChar = () => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current += 1;
                timerRef.current = setTimeout(typeChar, speed);
            } else {
                if (onComplete) onComplete();
            }
        };

        timerRef.current = setTimeout(typeChar, speed);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [hasStarted, text, speed, onComplete]);

    return (
        <span className={className}>
            {displayedText}
        </span>
    );
};

export default TypewriterText;
