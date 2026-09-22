import styles from "./ArrowButton.module.css";

interface ArrowProps {
    onClick: () => void;
    disabled: boolean;
    direction: string;
}

const ArrowButton = ({ onClick, disabled, direction }: ArrowProps) => {
    return (
        <button onClick={onClick} className={`${styles.navButton} ${direction == "right" ? styles.navButton_right : styles.navButton_left}`} disabled={disabled}>
            <svg className={styles.icon} width="36%" height="36%" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                {direction === "right" ? (
                    <path d="M11.25 32.2944L24.75 18.7944L11.25 5.29443" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                    <path d="M24.75 5.29443L11.25 18.7944L24.75 32.2944" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                )}
            </svg>
        </button>
    );
}

export default ArrowButton;
