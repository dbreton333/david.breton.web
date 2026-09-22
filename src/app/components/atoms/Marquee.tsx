import styles from "./Marquee.module.css";

interface MarqueeProps {
    text: string;
    speed?: number;
    className?: string;
}

export const Marquee = ({ text, speed = 22, className = "" }: MarqueeProps) => {
    const group = Array.from({ length: 4 }, () => text).join("  —  ") + "  —  ";

    return (
        <div className={`${styles.marquee} ${className}`} aria-hidden="true">
            <div className={styles.track} style={{ animationDuration: `${speed}s` }}>
                <span className={styles.group}>{group}</span>
                <span className={styles.group}>{group}</span>
            </div>
        </div>
    );
};

export default Marquee;
