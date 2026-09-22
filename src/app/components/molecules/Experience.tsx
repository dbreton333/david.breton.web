'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Experience.module.css";
import { Reveal } from "../atoms/Reveal";

interface ExperienceSectionProps {
    CompanyName: string,
    CompanyLogo: string,
    StartingDate: string,
    EndingDate: string,
    topic: string,
    paragraph: string
    ref: string
}

const Experience = (props: ExperienceSectionProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Reveal as="div" className={styles.row}>
            <div className={styles.row_head}>
                <Link
                    href={props.ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.logo_frame}
                    aria-label={`Visit ${props.CompanyName}'s website`}
                >
                    <Image src={props.CompanyLogo} fill sizes="96px" alt={`${props.CompanyName} logo`} style={{ objectFit: 'contain' }} />
                </Link>

                <button
                    type="button"
                    className={styles.trigger}
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                >
                    <span className={`${styles.name} h1 font-semibold`}>{props.CompanyName}</span>

                    <span className={styles.meta}>
                        <span className={`${styles.topic} p`}>{props.topic}</span>
                        <span className={`${styles.date} sub`}>{props.StartingDate} &mdash; {props.EndingDate}</span>
                    </span>

                    <svg className={`${styles.chevron} ${open ? styles.chevron_open : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className={styles.panel} data-open={open}>
                <div className={styles.panel_inner}>
                    <p className={`${styles.paragraph} p font-light`}>
                        {props.paragraph}
                    </p>
                </div>
            </div>
        </Reveal>
    );
};

export default Experience;
