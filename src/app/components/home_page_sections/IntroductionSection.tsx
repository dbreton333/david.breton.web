'use client'
import Image from 'next/image';
import Link from 'next/link';
import styles from './IntroductionSection.module.css';
import { Marquee } from '../atoms/Marquee';
import { WordReveal } from '../atoms/WordReveal';
import { Reveal } from '../atoms/Reveal';
import { LocationBadge } from '../atoms/LocationBadge';

const SOCIALS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-breton-72564417b/' },
    { label: 'GitHub', href: 'https://github.com/dbreton333' },
    { label: 'Instagram', href: 'https://www.instagram.com/biscuit_breton/' },
];

const Introduction = () => {
    return (
        <div className={styles.content}>
            <div className={styles.stage}>
                <div className={styles.name_marquee}>
                    <Marquee text="DAVID BRETON" speed={28} />
                </div>
                <div className={styles.photo_frame}>
                    <Image
                        src="/images/david-portrait.png"
                        alt="David Breton"
                        fill
                        priority
                        sizes="(max-width: 900px) 70vw, 42vw"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                </div>
                <LocationBadge location="Canada" className={styles.location_badge} />

                <Reveal as="div" delay={200} className={styles.marker}>
                    <svg className={styles.marker_arrow} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8L20 20M20 20V9M20 20H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className={`${styles.marker_text} h5`}>
                        Computer Engineer<br />Problem-Solver &amp; Builder
                    </p>
                </Reveal>
            </div>

            <div className={styles.lower_panel}>
                <div className={styles.statement}>
                    <WordReveal
                        text="I solve hard problems by rallying the right people around me."
                        className={`${styles.headline} h1 font-semibold`}
                    />
                </div>

                <Reveal as="div" delay={150} className={styles.bio_row}>
                    <p className={`${styles.paragraph} p font-light`}>
                        I solve complex problems with simple, effective solutions &mdash; and I say so when
                        something isn&apos;t working, because direct communication is what moves projects
                        forward. Problem-solver, builder, and someone who enjoys the people side of
                        engineering as much as the technical side. From co-founding a startup to shipping
                        software at a leading tech company, I&apos;ve consistently turned ambiguous problems
                        into results.
                    </p>

                    <div className={styles.socials}>
                        {SOCIALS.map((social) => (
                            <Link key={social.label} href={social.href} className={`${styles.social_link} sub`}>
                                {social.label}
                            </Link>
                        ))}
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

export default Introduction;
