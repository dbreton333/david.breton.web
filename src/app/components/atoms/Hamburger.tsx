// components/HamburgerMenu.tsx
import styles from './Hamburger.module.css';

interface HamburgerProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const HamburgerMenu = ({ isOpen, toggleMenu }: HamburgerProps) => {
    return (
        <div className={styles.hamburgerMenu}>
            <button
                className={`${styles.hamburgerButton}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span
                    className={`${styles.hamburgerLine} ${styles.hamburgerLineTop} ${isOpen ? styles.open : ''}`}
                />
                <span
                    className={`${styles.hamburgerLine} ${styles.hamburgerLineBottom} ${isOpen ? styles.open : ''}`}
                />

            </button>
        </div>
    );
};

export default HamburgerMenu;
