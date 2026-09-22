'use client';
import Image from "next/image";
import LinkButton from "../atoms/LinkButton";
import { Reveal } from "../atoms/Reveal";
import { WordReveal } from "../atoms/WordReveal";
import styles from "./AwardsSection.module.css";

const AwardsSection = () => {
    return (
        <div className={styles.content}>
            <Reveal className={styles.photo_content}>
                <div className={styles.photo_frame}>
                    <Image
                        src="/images/victory1-cutout.png"
                        alt="Holding the Trophée Éloïse-Angers award"
                        fill
                        priority
                        sizes="(max-width: 800px) 78vw, 52vw"
                        style={{ objectFit: 'contain', objectPosition: 'bottom left' }}
                    />
                </div>
            </Reveal>

            <div className={styles.text_content}>
                <h2 className={`${styles.title} h1 font-semibold`}>
                    <WordReveal text="Five podiums, three first-place finishes across national engineering competitions." />
                </h2>
                <Reveal delay={120} className={styles.text_body}>
                    <p className={`${styles.paragraph} p font-light`}>
                        I encourage any enthusiastic programmer to dive into these competitions &mdash;
                        there&apos;s no better way to prepare for real-life problems and deadlines.
                    </p>
                    <div className={styles.link_button_frame}>
                        <LinkButton href="/awards" text="View the competition record" textSize="h5"/>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

export default AwardsSection;
