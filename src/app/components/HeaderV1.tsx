'use client'

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeaderV1.module.css';
import HamburgerMenu from './atoms/Hamburger';


const HeaderV1 = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className={styles.header}>
            {/* Logo */}
            <div className={styles.logo}>
                <Link href="/">
                    <Image
                        src="/icons/my_logo.svg"
                        alt="Logo"
                        fill={true}
                        style={{ objectFit: 'contain' }}
                    />
                </Link>
            </div>
        
            {/* Desktop Menu */}
            <div className={styles.list_items}>
                <Link href="/" className={pathname === '/' ? styles.selected_item : styles.item}>
                    Home
                </Link>
                <Link href="/about" className={pathname === '/about' ? styles.selected_item : styles.item}>
                    About
                </Link>
                <Link href="/awards" className={pathname === '/awards' ? styles.selected_item : styles.item}>
                    Awards
                </Link>
                <Link href="/portfolio" className={pathname === '/portfolio' ? styles.selected_item : styles.item}>
                    Portfolio
                </Link>
            </div>

            {/* Mobile Menu */}
            <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} /> 
        </div>
    );
}

export default HeaderV1;
