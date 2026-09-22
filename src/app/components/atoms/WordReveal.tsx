'use client'
import { useEffect, useRef, useState } from "react";
import styles from "./WordReveal.module.css";

interface WordRevealProps {
    text: string;
    className?: string;
    wordClassName?: string;
    baseDelay?: number;
    stagger?: number;
}

export const WordReveal = ({ text, className = "", wordClassName = "", baseDelay = 0, stagger = 45 }: WordRevealProps) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggle both ways (rather than latching true and
                // unobserving) so the word-by-word reveal replays every time
                // the element re-enters view, not just the first time.
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const words = text.split(" ");

    return (
        <span ref={ref} className={`${styles.wrap} ${className}`}>
            {words.map((word, i) => (
                <span key={`${word}-${i}`} className={styles.mask}>
                    <span
                        className={`${styles.word} ${wordClassName} ${visible ? styles.visible : ""}`}
                        style={{ transitionDelay: `${baseDelay + i * stagger}ms` }}
                    >
                        {word}
                        {i < words.length - 1 ? " " : ""}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default WordReveal;
