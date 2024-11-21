'use client'
import styles from './Footer.module.css';
import Image from 'next/image';
import Link
 from 'next/link';
import { usePathname } from 'next/navigation';
import LinkButton from './atoms/LinkButton';

const Footer = () => {

    const pathname = usePathname();

    return (
        <footer className={`${styles.footer}`}>
            <div className={`${styles.devider}`}/>

            <footer className={`${styles.footer_content}`}>

                <div className={styles.general_info}>
                    <div className={styles.left_content}>
                    <div className={styles.profile}>
                        <div className={styles.profile_image}>
                            <Image src="/images/my_image.png" alt="David Breton" fill={true}/>
                        </div>
                        <div className={styles.profile_text}>
                            <h1 className={`${styles.name} h4`}>David Breton</h1>
                            <p className={`${styles.sub_name} h6`}>Software Developer</p>
                        </div>
                    </div>
                    <div className={styles.social_media}>
                    <div className={styles.social_media_icon}>
                        <Link href="https://www.linkedin.com/in/david-breton-72564417b/">
                        <Image
                            src="/icons/linkedin.svg"
                            alt="LinkedIn"
                            fill={true}
                            className={"object-contain"}
                        />
                        </Link>
                    </div>
                    <div className={styles.social_media_icon}>
                        <Link href="https://github.com/dbreton333">
                        <Image
                            src="/icons/github.svg"
                            alt="GitHub"
                            fill={true}
                            className={"object-contain"}
                        />
                        </Link>
                    </div>
                    <div className={styles.social_media_icon}>
                        <Link href="https://www.instagram.com/biscuit_breton/">
                        <Image
                            src="/icons/instagram.svg"
                            alt="Instagram"
                            fill={true}
                            className={"object-contain"}
                        />
                        </Link>
                    </div>
                    </div>
                    
                    </div>

                    <div className={`${styles.right_content}`}>
                        <h1 className={`${styles.title} h3`}>Get in touch</h1>
                        <div className={styles.contact}>
                            <div className={styles.email}>
                                <h1 className={`${styles.paragraph} p`}>EMAIL ME:</h1>
                                <div className={styles.link}>
                                    <LinkButton href="mailto:davidbreton03@gmail.com" text="davidbreton03@gmail.com" textSize="sub"/>
                                </div>
                            </div>
                            <div className={styles.phone}>
                                <h2 className={`${styles.paragraph} p`}>CALL ME:</h2>
                                <div className={styles.link}>
                                    <LinkButton href="call:davidbreton03@gmail.com" text="(514)-452-4102" textSize="sub"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div className={`${styles.devider_footer}`}/>





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
        </footer>
    );
}

export default Footer;