'use client'
import styles from './FooterContentBig.module.css';
import Image from 'next/image';
import Link
 from 'next/link';
import LinkButton from './LinkButton';



export const FooterContentBig = () => {

    return (

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
                        <h1 className={`${styles.paragraph} h6`}>EMAIL ME:</h1>
                        <div className={styles.link}>
                            <LinkButton href="mailto:davidbreton03@gmail.com" text="davidbreton03@gmail.com" textSize="p"/>
                        </div>
                    </div>
                    <div className={styles.phone}>
                        <h2 className={`${styles.paragraph} h6`}>CALL ME:</h2>
                        <div className={styles.link}>
                            <LinkButton href="call:davidbreton03@gmail.com" text="(514)-452-4102" textSize="p"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </footer>

    );
}