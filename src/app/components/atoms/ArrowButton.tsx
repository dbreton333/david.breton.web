import styles from "./ArrowButton.module.css";

interface ArrowProps {
    icon: string;
    onClick: () => void;
    disabled: boolean;
    direction: string;
}

const ArrowButton = ({ icon, onClick, disabled, direction }: ArrowProps) => {


    return (
        <button onClick={onClick} className={`${styles.navButton} ${direction == "right"? styles.navButton_right: styles.navButton_left}`} disabled={disabled}>
            <img src={icon} alt="Arrow" className={styles.icon}/>
        </button>
    );
}

export default ArrowButton;