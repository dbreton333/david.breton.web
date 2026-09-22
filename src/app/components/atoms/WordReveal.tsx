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

        // Split into two observers (see Reveal.tsx for the full
        // explanation): a single observer toggling both ways at threshold
        // 0.2 flips back and forth on small scroll jitter right around
        // that 20%-visible point, which is exactly what happens as an
        // element is entering or leaving the screen — reading as a twitch.
        // Entry keeps the original threshold; exit only fires at a true
        // 0%-overlap edge, pushed a good distance past the real viewport
        // edge, so the word-by-word reveal only resets once the element is
        // genuinely off screen, and then some.
        const enterObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.2 }
        );

        const exitObserver = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) setVisible(false);
            },
            { threshold: 0, rootMargin: "120px 0px 120px 0px" }
        );

        enterObserver.observe(node);
        exitObserver.observe(node);
        return () => {
            enterObserver.disconnect();
            exitObserver.disconnect();
        };
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
