'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './NavBar.module.css';
import { useMagnetic } from '../hooks/useMagnetic';

const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/awards', label: 'Awards' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
];

interface NavLinkProps {
    href: string;
    label: string;
    active: boolean;
}

const NavLink = ({ href, label, active }: NavLinkProps) => {
    const { ref, zoneHandlers } = useMagnetic<HTMLAnchorElement>({ proximity: 20, strength: 0.4 });

    return (
        <div className={styles.item_zone} {...zoneHandlers}>
            <Link
                href={href}
                ref={ref}
                className={active ? styles.selected_item : styles.item}
            >
                {label}
                <span className={styles.dot} />
            </Link>
        </div>
    );
};

const NavBar = () => {
    const pathname = usePathname();

    return (
        <div className={styles.header}>
            <Link href="/" className={styles.wordmark}>
                <span className={styles.copyright}>&copy;</span> David Breton
            </Link>

            <div className={styles.list_items}>
                {NAV_ITEMS.map((item) => (
                    <NavLink key={item.href} href={item.href} label={item.label} active={pathname === item.href} />
                ))}
            </div>
        </div>
    );
}

export default NavBar;
