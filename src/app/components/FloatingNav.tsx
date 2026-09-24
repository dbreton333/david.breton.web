'use client'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './FloatingNav.module.css';
import magneticStyles from './atoms/MagneticButton.module.css';
import { MagneticButton } from './atoms/MagneticButton';

const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/awards', label: 'Awards' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
];

const SOCIALS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-breton-72564417b/' },
    { label: 'GitHub', href: 'https://github.com/dbreton333' },
    { label: 'Instagram', href: 'https://www.instagram.com/biscuit_breton/' },
];

export const FloatingNav = () => {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > window.innerHeight * 0.6);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const toggle = () => setOpen((v) => !v);

    return (
        <>
            <div className={`${styles.trigger} ${visible || open ? styles.trigger_visible : ''}`}>
                <MagneticButton
                    onClick={toggle}
                    size="clamp(72px, 6vw, 104px)"
                    proximity={28}
                    ariaLabel={open ? 'Close menu' : 'Open menu'}
                    className={magneticStyles.blue}
                >
                    <span className={`${styles.icon} ${open ? styles.icon_open : ''}`}>
                        <span className={styles.icon_line} />
                        <span className={styles.icon_line} />
                        <span className={styles.icon_line} />
                    </span>
                </MagneticButton>
            </div>

            <div
                className={`${styles.backdrop} ${open ? styles.backdrop_open : ''}`}
                onClick={() => setOpen(false)}
                aria-hidden={!open}
            />

            <aside className={`${styles.panel} ${open ? styles.panel_open : ''}`}>
                <span className={`${styles.label} sub`}>Navigation</span>
                <div className={styles.hairline} />

                <nav className={styles.links}>
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.link}>
                            {pathname === item.href && <span className={styles.dot} />}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.footer}>
                    <span className={`${styles.label} sub`}>Socials</span>
                    <div className={styles.socials}>
                        {SOCIALS.map((social) => (
                            <a key={social.label} href={social.href} className="p">
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default FloatingNav;
