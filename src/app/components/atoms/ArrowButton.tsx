import styles from "./ArrowButton.module.css";
import Image from "next/image";

interface ArrowProps {
    icon: string;
    onClick: () => void;
    disabled: boolean;
    direction: string;
}

const ArrowButton = ({ icon, onClick, disabled, direction }: ArrowProps) => {


    return (
        <button onClick={onClick} className={`${styles.navButton} ${direction == "right"? styles.navButton_right: styles.navButton_left}`} disabled={disabled}>
            <div className={styles.icon}>
                <Image src={icon} alt="Arrow" fill={true}/>
            </div>
        </button>
    );
}

export default ArrowButton;