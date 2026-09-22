import styles from "./ComingSoon.module.css";

const TEXT = "Coming Soon";

export const ComingSoon = () => {
    return (
        <div className={styles.coming_soon}>
            <h1 className={`${styles.heading} h2 font-semibold`}>
                {TEXT.split("").map((char, i) => (
                    <span
                        key={i}
                        className={styles.letter}
                        style={{ animationDelay: `${i * 0.06}s` }}
                    >
                        {char === " " ? " " : char}
                    </span>
                ))}
                <span className={styles.dots} aria-hidden="true">
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                </span>
            </h1>
        </div>
    );
}
