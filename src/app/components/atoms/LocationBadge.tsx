'use client'
import { useEffect, useRef } from "react";
import styles from "./LocationBadge.module.css";

interface LocationBadgeProps {
    location: string;
    className?: string;
}

const RADIUS = 9.25;
const PERIOD_MS = 5400; // time for one full 360° rotation
const MERIDIAN_COUNT = 8;
// 8 meridians spaced evenly around the whole 360° globe (45° apart), not
// just staggered within the front-facing sweep. Only the front hemisphere
// (-90° to 90° longitude, 180° wide) is ever drawn — the rest would be on
// the far side of the sphere — so with a clean divisor like 45°, exactly
// 180/45 = 4 are visible at any instant, and the two at the visibility
// boundary sit exactly at the minimum radius, touching the circumference,
// which is also precisely where they appear/disappear. That makes the
// appear/disappear point blend into the circle's own stroke instead of
// popping in in the middle of nowhere — no artificial snap required.
const LONGITUDE_STEP_DEG = 360 / MERIDIAN_COUNT;

// theta: rotation angle in degrees, -90 (bowed left, touching the outer
// circle) through 0 (dead straight, edge-on) to 90 (bowed right, touching
// the circle). Sagitta s = RADIUS*sin(theta) is the true orthographic-
// projection physics for a meridian on a rotating sphere; the circular-arc
// radius that produces that sagitta on the fixed 18.5 pole-to-pole chord is
// solved from the standard sagitta formula, R = (r^2 + s^2) / (2s).
function meridianPath(thetaDeg: number): string {
    const theta = (Math.abs(thetaDeg) * Math.PI) / 180;
    const s = RADIUS * Math.sin(theta);
    const r = s < 0.01 ? 300 : (RADIUS * RADIUS + s * s) / (2 * s);
    const flag = thetaDeg < 0 ? 0 : 1;
    return `M12,2.75 A${r.toFixed(3)},${r.toFixed(3)} 0 0,${flag} 12,21.25`;
}

// Wrap to (-180, 180].
function normalizeAngle(deg: number): number {
    let a = deg % 360;
    if (a > 180) a -= 360;
    if (a <= -180) a += 360;
    return a;
}

export const LocationBadge = ({ location, className = "" }: LocationBadgeProps) => {
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Driven by rAF instead of a CSS @keyframes animation: this is
        // computed fresh from true elapsed time every frame, so theta (and
        // therefore rotation speed) is genuinely continuous — no
        // piecewise-linear keyframe segments for the eye to catch as
        // "steps" the way a many-stop CSS animation of a nonlinear radius
        // curve did.
        let frameId: number;
        const tick = (time: number) => {
            const globalDeg = (time / PERIOD_MS) * 360;
            pathRefs.current.forEach((el, i) => {
                if (!el) return;
                const longitude = normalizeAngle(globalDeg + i * LONGITUDE_STEP_DEG);
                const visible = longitude >= -90 && longitude <= 90;
                el.style.display = visible ? '' : 'none';
                if (visible) {
                    el.setAttribute('d', meridianPath(longitude));
                }
            });
            frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className={`${styles.badge} ${className}`}>
            <span className={`${styles.text} sub font-medium`}>Located<br />in {location}</span>
            <span className={styles.globe_wrap} aria-hidden="true">
                <svg className={styles.globe_svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.2" />
                    <g className={styles.rock}>
                        <path className={styles.lat} d="M3.168 9.25C6.271 7.7 17.729 7.7 20.832 9.25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                        <path className={styles.lat} d="M3.168 14.75C6.271 16.3 17.729 16.3 20.832 14.75" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                        {Array.from({ length: MERIDIAN_COUNT }, (_, i) => (
                            <path
                                key={i}
                                ref={(el) => { pathRefs.current[i] = el; }}
                                className={styles.meridian}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.1"
                                d="M12,2.75 A9.25,9.25 0 0,0 12,21.25"
                            />
                        ))}
                    </g>
                </svg>
            </span>
        </div>
    );
};

export default LocationBadge;
