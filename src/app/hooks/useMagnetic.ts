'use client'
import { useRef } from "react";
import type { MouseEvent } from "react";

interface UseMagneticOptions {
    proximity?: number;
    strength?: number;
}

export function useMagnetic<T extends HTMLElement>({ proximity = 40, strength = 0.35 }: UseMagneticOptions = {}) {
    const ref = useRef<T | null>(null);

    const onMouseMove = (e: MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(rect.width, rect.height) / 2 + proximity;

        if (dist < radius) {
            const pull = 1 - dist / radius;
            el.style.setProperty("--mx", `${dx * strength * pull}px`);
            el.style.setProperty("--my", `${dy * strength * pull}px`);
        } else {
            el.style.setProperty("--mx", "0px");
            el.style.setProperty("--my", "0px");
        }
    };

    const onMouseLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
    };

    return { ref, zoneHandlers: { onMouseMove, onMouseLeave } };
}

export default useMagnetic;
