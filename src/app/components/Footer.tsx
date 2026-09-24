'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import { Reveal } from './atoms/Reveal';
import { MagneticButton } from './atoms/MagneticButton';
import magneticStyles from './atoms/MagneticButton.module.css';
import { LocalTime } from './atoms/LocalTime';
import { useMagnetic } from '../hooks/useMagnetic';

const SOCIALS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-breton-72564417b/' },
    { label: 'GitHub', href: 'https://github.com/dbreton333' },
    { label: 'Instagram', href: 'https://www.instagram.com/biscuit_breton/' },
];

const CURVE_BULGE_MAX = 90;
const CURVE_WIDTH = 1000;
// Fallback used for the very first paint, before we know the real viewport
// height — close to the clamped range below so there's no visible jump once
// the effect runs.
const DEFAULT_GAP_MAX = 320;

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    // gapT: 0 -> 1 closes the white space above the curve (phase 1)
    // bulgeT: 0 -> 1 flattens the curve once the gap is closed (phase 2)
    const [gapT, setGapT] = useState(0);
    const [bulgeT, setBulgeT] = useState(0);
    const [gapMax, setGapMax] = useState(DEFAULT_GAP_MAX);
    // One hook instance per pill — each tracks its own element's cursor
    // proximity independently, same pattern as NavBar's per-link magnetism.
    const emailMagnetic = useMagnetic<HTMLAnchorElement>({ proximity: 24, strength: 0.35 });
    const phoneMagnetic = useMagnetic<HTMLAnchorElement>({ proximity: 24, strength: 0.35 });

    useEffect(() => {
        const onScroll = () => {
            const el = footerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            // At rest the white gap should still bury a good chunk of the
            // footer (per the Snellenberg reference, where the heading is
            // still half-covered before you scroll further) rather than the
            // few flat pixels this used to be.
            setGapMax(Math.min(Math.max(vh * 0.5, 240), 460));
            // The overlay lives at the very top of the footer, so it only
            // becomes visible once the footer's top edge has already
            // scrolled some way up the screen — starting the transition at
            // rect.top === vh (the instant the footer's top touches the
            // bottom of the viewport) meant it was already shrinking before
            // anyone could see it at full size. Instead, hold it at full
            // size until the footer's top has scrolled up to `startAt`.
            const startAt = vh * 0.65;
            // The transition has to finish by the time the page hits max
            // scroll, but a fixed vh-based range doesn't respect that: on
            // mobile the footer's own height is often close to the viewport
            // height, so there's barely any scroll room left after it
            // enters — a fixed range overshoots the available scroll and
            // the curve gets stuck mid-flatten forever. `minTop` is the
            // lowest rect.top can ever go (reached exactly at max scroll,
            // since the footer is the last element on the page), so sizing
            // the range against it guarantees t reaches 1 by then.
            const minTop = vh - rect.height;
            const range = Math.max(startAt - minTop, 1);
            const t = Math.min(Math.max((startAt - rect.top) / range, 0), 1);
            setGapT(Math.min(t / 0.5, 1));
            setBulgeT(Math.min(Math.max((t - 0.5) / 0.5, 0), 1));
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    const gapHeight = gapMax * (1 - gapT);
    const bulge = CURVE_BULGE_MAX * (1 - bulgeT);
    const curveViewHeight = CURVE_BULGE_MAX;
    // A shallow slice of a much larger circle, sitting flush on the top edge
    // (0,0) to (W,0) and sagging down to `bulge` at the midpoint. An ellipse
    // (rx=W/2, ry=bulge) was tried first, but an ellipse's tangent at the
    // exact point where it meets its major axis is always perpendicular to
    // that axis — so no matter how flat the ellipse, the curve always meets
    // the boundary line vertically at both ends, reading as a "capsule" cut
    // off rather than an arc. Solving for the radius of a circle that passes
    // through (0,0) and (W,0) with the same sag gives a much shallower
    // approach at the edges instead. When bulge hits 0 the required radius
    // blows up (a straight line is an arc of infinite radius), so that case
    // is special-cased to a plain line rather than computed.
    const halfWidth = CURVE_WIDTH / 2;
    const curvePath = bulge < 0.5
        ? `M0,0 L${CURVE_WIDTH},0 Z`
        : `M0,0 A${(halfWidth * halfWidth + bulge * bulge) / (2 * bulge)},${(halfWidth * halfWidth + bulge * bulge) / (2 * bulge)} 0 0 0 ${CURVE_WIDTH},0 Z`;

    return (
        <footer ref={footerRef} className={styles.footer}>
            <div className={styles.curve_gap} style={{ height: gapHeight }} aria-hidden="true" />
            <div className={styles.curve} style={{ top: gapHeight, height: curveViewHeight }} aria-hidden="true">
                <svg
                    className={styles.curve_svg}
                    viewBox={`0 0 ${CURVE_WIDTH} ${curveViewHeight}`}
                    preserveAspectRatio="none"
                >
                    <path d={curvePath} style={{ fill: 'var(--paper)' }} />
                </svg>
            </div>

            <div className={styles.inner}>
                <Reveal className={styles.top}>
                    <div className={styles.heading_row}>
                        <div className={styles.avatar}>
                            <Image
                                src="/images/david-portrait.png"
                                alt="David Breton"
                                fill
                                sizes="128px"
                                style={{ objectFit: 'cover', objectPosition: 'top' }}
                            />
                        </div>
                        <h2 className={`${styles.headline} huge font-semibold`}>
                            Let&apos;s work<br />together
                        </h2>
                    </div>

                    <svg className={styles.corner_arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 7L7 17M7 17V8M7 17H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Reveal>

                <div className={styles.cta_row}>
                    <div className={styles.cta_line} />
                    <Reveal offsetX={-160} offsetY={0} className={styles.cta_reveal}>
                        <MagneticButton
                            href="mailto:davidbreton03@gmail.com"
                            className={`${magneticStyles.filled} ${styles.cta_button}`}
                        >
                            Get in touch
                        </MagneticButton>
                    </Reveal>
                </div>

                <div className={styles.contact_row}>
                    <div className={styles.pill_zone} {...emailMagnetic.zoneHandlers}>
                        <a
                            ref={emailMagnetic.ref}
                            className={styles.contact_pill}
                            href="mailto:davidbreton03@gmail.com"
                        >
                            <span className={styles.pill_fill} aria-hidden="true" />
                            <span className={`${styles.pill_label} h5`}>davidbreton03@gmail.com</span>
                        </a>
                    </div>
                    <div className={styles.pill_zone} {...phoneMagnetic.zoneHandlers}>
                        <a
                            ref={phoneMagnetic.ref}
                            className={styles.contact_pill}
                            href="tel:+15144524102"
                        >
                            <span className={styles.pill_fill} aria-hidden="true" />
                            <span className={`${styles.pill_label} h5`}>(514) 452-4102</span>
                        </a>
                    </div>
                </div>

                <div className={styles.meta_row}>
                    <div className={styles.meta_block}>
                        <span className={`${styles.label} sub`}>Local time</span>
                        <LocalTime className="p" />
                    </div>
                    <div className={styles.meta_block}>
                        <span className={`${styles.label} sub`}>Elsewhere</span>
                        <div className={styles.socials}>
                            {SOCIALS.map((social) => (
                                <a key={social.label} href={social.href} className="p">
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
