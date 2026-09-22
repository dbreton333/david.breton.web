'use client'
import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
    children: ReactNode;
    as?: ElementType;
    delay?: number;
    className?: string;
}

export const Reveal = ({ children, as: Tag = "div", delay = 0, className = "" }: RevealProps) => {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggle both ways (rather than latching true and
                // unobserving) so the reveal replays every time the element
                // re-enters view, not just the first time.
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`${styles.reveal} ${visible ? styles.visible : ""} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
