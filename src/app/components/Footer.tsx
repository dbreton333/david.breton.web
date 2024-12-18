'use client'
import styles from './Footer.module.css';
import Image from 'next/image';
import Link
 from 'next/link';
import { usePathname } from 'next/navigation';
import { FooterContentBig } from './atoms/FooterContentBig';
import { FooterContentSmall } from './atoms/FooterContentSmall';

const Footer = () => {

    const pathname = usePathname();

    return (
        <footer className={`${styles.footer}`}>
            <div className={`${styles.devider}`}/>

            <FooterContentSmall/>
            <FooterContentBig/>
            <div className={`${styles.container}`}>
                <div className={`${styles.devider_footer}`}/>
            </div>

            <div className={styles.footer_nav}>
                    
                    {/* Desktop Menu */}
                <div className={styles.list_items}>
                    <Link href="/" className={pathname === '/' ? styles.selected_item : styles.item}>
                        Home
                    </Link>
                    <Link href="/awards" className={pathname === '/awards' ? styles.selected_item : styles.item}>
                        Awards
                    </Link>
                    <Link href="/about" className={pathname === '/about' ? styles.selected_item : styles.item}>
                        About
                    </Link>
                    <Link href="/portfolio" className={pathname === '/portfolio' ? styles.selected_item : styles.item}>
                        Portfolio
                    </Link>
                </div>

                <div className={styles.placeholder}/>

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
            </div>
        </footer>
    );
}

export default Footer;