'use client'
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import styles from "./MagneticButton.module.css";
import { useMagnetic } from "../../hooks/useMagnetic";

interface MagneticButtonProps {
    href?: string;
    onClick?: () => void;
    children: ReactNode;
    className?: string;
    size?: string;
    proximity?: number;
    ariaLabel?: string;
}

export const MagneticButton = ({
    href,
    onClick,
    children,
    className = "",
    size,
    proximity = 42,
    ariaLabel,
}: MagneticButtonProps) => {
    const { ref, zoneHandlers } = useMagnetic<HTMLAnchorElement & HTMLButtonElement>({ proximity, strength: 0.35 });

    const style = size ? ({ "--btn-size": size } as CSSProperties) : undefined;
    const zoneStyle = { "--zone-pad": `${proximity}px` } as CSSProperties;
    const sharedClassName = `${styles.magnetic} ${className}`;

    return (
        <div className={styles.zone} style={zoneStyle} {...zoneHandlers}>
            {href ? (
                <Link
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    className={sharedClassName}
                    style={style}
                    aria-label={ariaLabel}
                >
                    <span className={styles.fill} aria-hidden="true" />
                    <span className={styles.inner}>{children}</span>
                </Link>
            ) : (
                <button
                    ref={ref as React.Ref<HTMLButtonElement>}
                    type="button"
                    className={sharedClassName}
                    style={style}
                    onClick={onClick}
                    aria-label={ariaLabel}
                >
                    <span className={styles.fill} aria-hidden="true" />
                    <span className={styles.inner}>{children}</span>
                </button>
            )}
        </div>
    );
};

export default MagneticButton;
