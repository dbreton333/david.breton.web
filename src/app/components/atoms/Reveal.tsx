'use client'
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
    children: ReactNode;
    as?: ElementType;
    delay?: number;
    className?: string;
    // Pre-reveal offset in px, e.g. offsetX={-160} to slide in from the
    // left instead of the default offsetY-only slide-up.
    offsetX?: number;
    offsetY?: number;
}

export const Reveal = ({ children, as: Tag = "div", delay = 0, className = "", offsetX, offsetY }: RevealProps) => {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Two separate observers rather than one toggling both ways: a
        // single observer at threshold 0.15 fires its callback whenever
        // the element crosses 15% visible in *either* direction, so small
        // scroll jitter right around that point — common right as an
        // element is entering or leaving the screen — flips `visible`
        // back and forth rapidly, reading as a twitch. Splitting the
        // enter and exit triggers apart lets each use whatever boundary
        // actually suits it: entry keeps the original "reveal a bit
        // before it's fully on screen" tuning, while exit only fires at
        // a true 0%-overlap edge (threshold: 0, so there's no fuzzy
        // interior percentage to jitter around) that's also pushed a
        // good distance past the real viewport edge — so it only resets
        // once the element is genuinely off screen, and then some.
        const enterObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
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

    const style: CSSProperties = { transitionDelay: `${delay}ms` };
    if (offsetX !== undefined) (style as Record<string, string>)["--reveal-x"] = `${offsetX}px`;
    if (offsetY !== undefined) (style as Record<string, string>)["--reveal-y"] = `${offsetY}px`;

    return (
        <Tag
            ref={ref}
            className={`${styles.reveal} ${visible ? styles.visible : ""} ${className}`}
            style={style}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
