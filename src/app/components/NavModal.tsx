import React from 'react';
import styles from './NavModal.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ModalProps {
    isOpen: boolean;
    toggleModal: () => void;
}

const NavModal = (props: ModalProps) => {
  if (!props.isOpen) return null;
  const pathname = usePathname();

  return (
    <div className={styles.modalOverlay} onClick={props.toggleModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Link href="/" className={pathname === '/' ? styles.selected_item : styles.item}>Home</Link>
        <Link href="/awards" className={pathname === '/awards' ? styles.selected_item : styles.item}>Awards</Link>
        <Link href="/about" className={pathname === '/about' ? styles.selected_item : styles.item}>About</Link>
        <Link href="/portfolio" className={pathname === '/portfolio' ? styles.selected_item : styles.item}>Portfolio</Link>
      </div>
    </div>
  );
};

export default NavModal;